#!/usr/bin/perl
use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';
use Getopt::Long;
use File::Copy qw(move);

# 配置参数
my %opt = (
    rules     => 't2s_rules.conf', # 默认规则文件
    backup    => 0,                # 是否备份
    verbose   => 0,                # 显示详细信息
    encoding  => 'UTF-8',          # 文件编码
    output    => undef,           # 输出目录或文件
);
GetOptions(
    'r|rules=s'    => \$opt{rules},
    'b|backup'     => \$opt{backup},
    'v|verbose'    => \$opt{verbose},
    'e|encoding=s' => \$opt{encoding},
    'o|output=s'   => \$opt{output},
    'h|help'       => sub { usage() },
) or usage(1);

# 参数校验
usage(1) unless @ARGV;
-e $opt{rules} or die "[ERROR] 规则文件 '$opt{rules}' 不存在\n";

# 预加载规则
my @rules;
load_rules($opt{rules}, \@rules);

# 处理文件
foreach my $file (@ARGV) {
    convert_file($file, \@rules);
}

#=============== 子函数 ================
sub load_rules {
    my ($rule_file, $rules_ref) = @_;

    open(my $fh, '<:encoding(UTF-8)', $rule_file)
        or die "[ERROR] 无法打开规则文件 '$rule_file': $!\n";

    while (<$fh>) {
        chomp;
        next if /^\s*#/ || /^\s*$/;  # 跳过注释和空行

        # 解析规则行（支持2+空格对齐和REGEX:标记）
        my ($is_regex, $pattern, $replacement) = parse_rule_line($_);

        # 编译正则表达式
        my $compiled = $is_regex ? qr/$pattern/ : qr/\Q$pattern\E/;
        push @$rules_ref, {
            pattern => $compiled,
            replace => $replacement,
            raw     => $_
        };

        print "[RULE] 已加载: $_\n" if $opt{verbose};
    }
    close $fh;
}

sub parse_rule_line {
    my ($line) = @_;

    my $is_regex = ($line =~ s/^REGEX://) ? 1 : 0; # 识别正则表达式标记
    my ($p, $r) = split(/\s{2,}/, $line, 2);       # 提取参数，支持2+空格分隔

    unless (defined $p && defined $r) {
        my $type = $is_regex ? '（REGEX）' : '';
        die "[ERROR] 规则格式错误$type: '$line'\n";
    }

    # 正则语法检测
    if ($is_regex) {
        eval { qr/$p/ };
        if ($@) {
            die "[ERROR] 无效的正则表达式 '$p': $@\n";
        }
    }

    return ($is_regex, $p, $r);
}

sub convert_file {
    my ($file, $rules_ref) = @_;

    # 备份处理
    my $bak_file = "$file.bak";
    if ($opt{backup} && !-e $bak_file) {
        move ($file, $bak_file)
            or die "[ERROR] 备份失败: 无法将 '$file' 备份为 '$bak_file': $!\n";
    }

    my $input_file = ($opt{backup} && -e $bak_file) ? $bak_file : $file;
    open(my $in, '<:encoding('.$opt{encoding}.')', $input_file)
        or die "[ERROR] 无法读取文件 '$input_file': $!\n";
    open(my $out, '>:encoding('.$opt{encoding}.')', "$file.tmp")
        or die "[ERROR] 无法创建临时文件 '$file.tmp': $!\n";

    # 逐行处理
    my $count = 0;
    while (<$in>) {
        my $origin = $_;
        foreach my $rule (@$rules_ref) {
            s/$rule->{pattern}/$rule->{replace}/g;
        }
        print $out $_;
        $count += 1;
        print "已处理 $count 行\r" if $opt{verbose} && $count % 100 == 0;
    }

    close $in;
    close $out;

    # 文件输出处理
    my $out_path;
    if (defined $opt{output}) {
        if (-d $opt{output}) {
            my $basename = $file;
            $basename =~ s|.*/||;
            $out_path = "$opt{output}/$basename";
        } else {
            $out_path = $opt{output};
        }
    } else {
        $out_path = $file;
    }

    move("$file.tmp", $out_path)
        or die "[ERROR] 无法将临时文件 '$file.tmp' 移动为 '$out_path': $!\n";

    unlink $bak_file unless $opt{backup};

    print "\n[OK] 已转换 $file (共 $count 行)\n" if $opt{verbose};
    print "[OK] 已输出到 $out_path\n" if $opt{verbose};
}

sub usage {
    print <<"END_USAGE";
简繁转换脚本 v2.0
用法: $0 [选项] 文件1 文件2...

选项:
  -r, --rules=FILE    规则配置文件 (默认: $opt{rules})
  -b, --backup        保留原始文件备份 (.bak)
  -e, --encoding=ENC  文件编码 (默认: $opt{encoding})
  -o, --output=PATH   输出文件路径或目录
  -v, --verbose       显示详细处理信息
  -h, --help          显示此帮助信息

规则文件格式:
  普通替换: 原文本[2+空格]替换文本
  正则替换: REGEX:模式[2+空格]替换文本

示例:
  $0 -v -b locals_zh-TW.js
  $0 -v -o ../locals_zh-TW.js
  $0 -r custom_rules.conf *.js
END_USAGE
    exit($_[0] || 0);
;
}
