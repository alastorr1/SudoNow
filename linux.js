// Linux Commands Tutorial JavaScript

// Command data structure
const commandData = {
    navigation: {
        title: "File Navigation",
        commands: {
            ls: {
                title: "ls - List Directory Contents",
                syntax: "ls [options] [directory]",
                description: "Lists files and directories in the current directory or specified directory.",
                examples: [
                    "ls - List files in current directory",
                    "ls -la - List all files with details",
                    "ls -lh - List files with human-readable sizes",
                    "ls /home - List files in /home directory"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "Documents  Downloads  Pictures  Videos  Desktop" },
                    { prompt: "user@linux:~$", command: "ls -la" },
                    { output: "total 40<br>drwxr-xr-x  5 user user 4096 Jan 15 10:30 .<br>drwxr-xr-x  3 root root 4096 Jan 15 09:15 ..<br>-rw-r--r--  1 user user  220 Jan 15 09:15 .bash_logout<br>-rw-r--r--  1 user user 3771 Jan 15 09:15 .bashrc<br>drwxr-xr-x  2 user user 4096 Jan 15 10:30 Desktop<br>drwxr-xr-x  2 user user 4096 Jan 15 10:30 Documents" }
                ]
            },
            cd: {
                title: "cd - Change Directory",
                syntax: "cd [directory]",
                description: "Changes the current working directory to the specified directory.",
                examples: [
                    "cd /home/user - Change to user's home directory",
                    "cd .. - Go to parent directory",
                    "cd ~ - Go to home directory",
                    "cd - - Go to previous directory"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "pwd" },
                    { output: "/home/user" },
                    { prompt: "user@linux:~$", command: "cd Documents" },
                    { output: "" },
                    { prompt: "user@linux:~/Documents$", command: "pwd" },
                    { output: "/home/user/Documents" }
                ]
            },
            pwd: {
                title: "pwd - Print Working Directory",
                syntax: "pwd [options]",
                description: "Displays the full pathname of the current working directory.",
                examples: [
                    "pwd - Show current directory path",
                    "pwd -P - Show physical path (resolve symlinks)"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "pwd" },
                    { output: "/home/user" },
                    { prompt: "user@linux:~$", command: "cd /etc" },
                    { output: "" },
                    { prompt: "user@linux:/etc$", command: "pwd" },
                    { output: "/etc" }
                ]
            },
            tree: {
                title: "tree - Display Directory Tree",
                syntax: "tree [options] [directory]",
                description: "Displays a tree-like structure of directories and files.",
                examples: [
                    "tree - Show directory tree",
                    "tree -L 2 - Limit depth to 2 levels",
                    "tree -a - Show hidden files",
                    "tree -d - Show only directories"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "tree -L 2" },
                    { output: ".<br>├── Desktop<br>├── Documents<br>│   ├── work<br>│   └── personal<br>├── Downloads<br>│   ├── file1.txt<br>│   └── file2.pdf<br>├── Pictures<br>└── Videos<br><br>5 directories, 2 files" }
                ]
            }
        }
    },
    files: {
        title: "File Operations",
        commands: {
            cp: {
                title: "cp - Copy Files and Directories",
                syntax: "cp [options] source destination",
                description: "Copies files and directories from source to destination.",
                examples: [
                    "cp file1.txt file2.txt - Copy file1 to file2",
                    "cp -r dir1 dir2 - Copy directory recursively",
                    "cp -v file.txt /backup/ - Copy with verbose output",
                    "cp -p file.txt backup/ - Preserve file attributes"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "file1.txt  file2.txt" },
                    { prompt: "user@linux:~$", command: "cp file1.txt backup.txt" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "backup.txt  file1.txt  file2.txt" }
                ]
            },
            mv: {
                title: "mv - Move/Rename Files",
                syntax: "mv [options] source destination",
                description: "Moves or renames files and directories.",
                examples: [
                    "mv oldname.txt newname.txt - Rename file",
                    "mv file.txt /destination/ - Move file to directory",
                    "mv -i file.txt backup/ - Interactive move",
                    "mv -v file.txt /backup/ - Verbose move"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "oldfile.txt  other.txt" },
                    { prompt: "user@linux:~$", command: "mv oldfile.txt newfile.txt" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "newfile.txt  other.txt" }
                ]
            },
            rm: {
                title: "rm - Remove Files",
                syntax: "rm [options] file...",
                description: "Removes files and directories. Use with caution!",
                examples: [
                    "rm file.txt - Remove single file",
                    "rm -r directory/ - Remove directory recursively",
                    "rm -f file.txt - Force remove (no confirmation)",
                    "rm -i file.txt - Interactive remove"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "file1.txt  file2.txt  temp.txt" },
                    { prompt: "user@linux:~$", command: "rm temp.txt" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "file1.txt  file2.txt" }
                ]
            },
            mkdir: {
                title: "mkdir - Create Directory",
                syntax: "mkdir [options] directory...",
                description: "Creates new directories.",
                examples: [
                    "mkdir newdir - Create single directory",
                    "mkdir -p parent/child - Create nested directories",
                    "mkdir dir1 dir2 dir3 - Create multiple directories",
                    "mkdir -m 755 newdir - Create with specific permissions"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "file1.txt  file2.txt" },
                    { prompt: "user@linux:~$", command: "mkdir newproject" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls" },
                    { output: "file1.txt  file2.txt  newproject" }
                ]
            }
        }
    },
    system: {
        title: "System Commands",
        commands: {
            ps: {
                title: "ps - Process Status",
                syntax: "ps [options]",
                description: "Displays information about running processes.",
                examples: [
                    "ps aux - Show all processes",
                    "ps -ef - Show all processes (alternative format)",
                    "ps -u username - Show user's processes",
                    "ps aux | grep process - Find specific process"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ps aux | head -5" },
                    { output: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND<br>root         1  0.0  0.0  22540  2136 ?        Ss   Jan15   0:01 /sbin/init<br>root         2  0.0  0.0      0     0 ?        S    Jan15   0:00 [kthreadd]<br>root         3  0.0  0.0      0     0 ?        S    Jan15   0:00 [ksoftirqd/0]<br>root         5  0.0  0.0      0     0 ?        S<   Jan15   0:00 [kworker/0:0H]" }
                ]
            },
            top: {
                title: "top - System Monitor",
                syntax: "top [options]",
                description: "Displays real-time system information including processes, CPU, and memory usage.",
                examples: [
                    "top - Start system monitor",
                    "top -u username - Monitor specific user",
                    "top -p PID - Monitor specific process",
                    "top -n 1 - Run once and exit"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "top -n 1 | head -10" },
                    { output: "top - 14:30:15 up 2:15,  1 user,  load average: 0.52, 0.58, 0.59<br>Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie<br>%Cpu(s):  2.3 us,  1.7 sy,  0.0 ni, 95.7 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st<br>KiB Mem :  8048576 total,  2345678 free,  3456789 used,  2246109 buff/cache<br>KiB Swap:  2097148 total,  2097148 free,        0 used.  4123456 avail Mem<br><br>  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND<br> 1234 user      20   0  1234567  89012  12345 S   2.3  1.1   0:15.67 firefox<br> 5678 user      20   0   987654  65432   9876 S   1.7  0.8   0:08.23 gnome-terminal" }
                ]
            },
            df: {
                title: "df - Disk Space",
                syntax: "df [options] [file...]",
                description: "Shows disk space usage for file systems.",
                examples: [
                    "df -h - Show human-readable sizes",
                    "df -T - Show file system types",
                    "df /home - Show specific directory",
                    "df -i - Show inode information"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "df -h" },
                    { output: "Filesystem      Size  Used Avail Use% Mounted on<br>/dev/sda1        20G   15G  4.0G  79% /<br>tmpfs           3.2G     0  3.2G   0% /dev/shm<br>/dev/sdb1       100G   45G   50G  47% /home<br>tmpfs           3.2G  8.0K  3.2G   1% /run/user/1000" }
                ]
            },
            free: {
                title: "free - Memory Usage",
                syntax: "free [options]",
                description: "Displays information about system memory usage.",
                examples: [
                    "free -h - Show human-readable sizes",
                    "free -s 5 - Update every 5 seconds",
                    "free -t - Show total line",
                    "free -m - Show sizes in MB"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "free -h" },
                    { output: "              total        used        free      shared  buff/cache   available<br>Mem:           7.8Gi       3.4Gi       2.3Gi       123Mi       2.1Gi       4.1Gi<br>Swap:          2.0Gi          0B       2.0Gi" }
                ]
            }
        }
    },
    network: {
        title: "Network Commands",
        commands: {
            ping: {
                title: "ping - Network Connectivity",
                syntax: "ping [options] host",
                description: "Tests network connectivity to a host by sending ICMP echo requests.",
                examples: [
                    "ping google.com - Ping Google",
                    "ping -c 4 8.8.8.8 - Send 4 packets",
                    "ping -i 2 google.com - Send packet every 2 seconds",
                    "ping -s 1500 google.com - Send 1500 byte packets"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ping -c 3 google.com" },
                    { output: "PING google.com (142.250.190.78) 56(84) bytes of data.<br>64 bytes from google.com (142.250.190.78): icmp_seq=1 time=15.2 ms<br>64 bytes from google.com (142.250.190.78): icmp_seq=2 time=14.8 ms<br>64 bytes from google.com (142.250.190.78): icmp_seq=3 time=15.1 ms<br><br>--- google.com ping statistics ---<br>3 packets transmitted, 3 received, 0% packet loss, time 2003ms<br>rtt min/avg/max/mdev = 14.800/15.033/15.200/0.200 ms" }
                ]
            },
            netstat: {
                title: "netstat - Network Statistics",
                syntax: "netstat [options]",
                description: "Displays network connections, routing tables, and network interface statistics.",
                examples: [
                    "netstat -tuln - Show listening TCP/UDP ports",
                    "netstat -an - Show all connections",
                    "netstat -i - Show interface statistics",
                    "netstat -r - Show routing table"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "netstat -tuln | head -10" },
                    { output: "Active Internet connections (only servers)<br>Proto Recv-Q Send-Q Local Address           Foreign Address         State<br>tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN<br>tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN<br>tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN<br>tcp6       0      0 :::22                   :::*                    LISTEN<br>tcp6       0      0 ::1:631                 :::*                    LISTEN<br>udp        0      0 0.0.0.0:68              0.0.0.0:*" }
                ]
            },
            ifconfig: {
                title: "ifconfig - Network Interface",
                syntax: "ifconfig [interface] [options]",
                description: "Configures and displays network interface parameters.",
                examples: [
                    "ifconfig - Show all interfaces",
                    "ifconfig eth0 - Show specific interface",
                    "ifconfig eth0 up - Enable interface",
                    "ifconfig eth0 down - Disable interface"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ifconfig eth0" },
                    { output: "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500<br>        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255<br>        inet6 fe80::215:5dff:fe8a:1234  prefixlen 64  scopeid 0x20<link><br>        ether 00:15:5d:8a:12:34  txqueuelen 1000  (Ethernet)<br>        RX packets 12345  bytes 9876543 (9.4 MiB)<br>        RX errors 0  dropped 0  overruns 0  frame 0<br>        TX packets 9876  bytes 1234567 (1.1 MiB)<br>        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0" }
                ]
            },
            nslookup: {
                title: "nslookup - DNS Lookup",
                syntax: "nslookup [options] [host] [server]",
                description: "Queries DNS servers for domain name resolution.",
                examples: [
                    "nslookup google.com - Lookup domain",
                    "nslookup 8.8.8.8 - Reverse lookup",
                    "nslookup google.com 8.8.8.8 - Use specific DNS server",
                    "nslookup -type=mx google.com - Lookup MX records"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "nslookup google.com" },
                    { output: "Server:         192.168.1.1<br>Address:        192.168.1.1#53<br><br>Non-authoritative answer:<br>Name:   google.com<br>Address: 142.250.190.78<br>Name:   google.com<br>Address: 2607:f8b0:4004:c0c::65" }
                ]
            }
        }
    },
    text: {
        title: "Text Processing",
        commands: {
            grep: {
                title: "grep - Search Text",
                syntax: "grep [options] pattern [file...]",
                description: "Searches for patterns in text files using regular expressions.",
                examples: [
                    "grep 'pattern' file.txt - Search for pattern in file",
                    "grep -i 'pattern' file.txt - Case-insensitive search",
                    "grep -r 'pattern' directory/ - Recursive search",
                    "grep -v 'pattern' file.txt - Invert match"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "cat sample.txt" },
                    { output: "This is line 1<br>This is line 2<br>This is line 3<br>Another line<br>Last line" },
                    { prompt: "user@linux:~$", command: "grep 'line' sample.txt" },
                    { output: "This is line 1<br>This is line 2<br>This is line 3<br>Another line<br>Last line" }
                ]
            },
            sed: {
                title: "sed - Stream Editor",
                syntax: "sed [options] 'command' [file...]",
                description: "Stream editor for filtering and transforming text.",
                examples: [
                    "sed 's/old/new/g' file.txt - Replace text globally",
                    "sed '1,5d' file.txt - Delete lines 1-5",
                    "sed 's/^/#/' file.txt - Add # to start of each line",
                    "sed -i 's/old/new/g' file.txt - Edit file in place"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "cat data.txt" },
                    { output: "apple<br>banana<br>cherry<br>date" },
                    { prompt: "user@linux:~$", command: "sed 's/a/A/g' data.txt" },
                    { output: "Apple<br>bAnAnA<br>cherry<br>dAte" }
                ]
            },
            awk: {
                title: "awk - Text Processing",
                syntax: "awk [options] 'program' [file...]",
                description: "Pattern scanning and text processing language.",
                examples: [
                    "awk '{print $1}' file.txt - Print first field",
                    "awk '/pattern/' file.txt - Print lines matching pattern",
                    "awk '{sum += $1} END {print sum}' file.txt - Sum first column",
                    "awk -F: '{print $1}' /etc/passwd - Use : as field separator"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "cat users.txt" },
                    { output: "john 25 engineer<br>jane 30 manager<br>bob 28 developer" },
                    { prompt: "user@linux:~$", command: "awk '{print $1, $3}' users.txt" },
                    { output: "john engineer<br>jane manager<br>bob developer" }
                ]
            },
            sort: {
                title: "sort - Sort Lines",
                syntax: "sort [options] [file...]",
                description: "Sorts lines of text files.",
                examples: [
                    "sort file.txt - Sort alphabetically",
                    "sort -n file.txt - Sort numerically",
                    "sort -r file.txt - Sort in reverse order",
                    "sort -k2 file.txt - Sort by second field"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "cat numbers.txt" },
                    { output: "15<br>3<br>42<br>7<br>1" },
                    { prompt: "user@linux:~$", command: "sort -n numbers.txt" },
                    { output: "1<br>3<br>7<br>15<br>42" }
                ]
            }
        }
    },
    security: {
        title: "Security Commands",
        commands: {
            chmod: {
                title: "chmod - Change Permissions",
                syntax: "chmod [options] mode file...",
                description: "Changes file permissions and access modes.",
                examples: [
                    "chmod 755 file.txt - Set read/write/execute for owner, read/execute for others",
                    "chmod +x script.sh - Make file executable",
                    "chmod -R 644 directory/ - Recursively set permissions",
                    "chmod u+rw file.txt - Add read/write for user"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls -l script.sh" },
                    { output: "-rw-r--r-- 1 user user 123 Jan 15 10:30 script.sh" },
                    { prompt: "user@linux:~$", command: "chmod +x script.sh" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls -l script.sh" },
                    { output: "-rwxr-xr-x 1 user user 123 Jan 15 10:30 script.sh" }
                ]
            },
            chown: {
                title: "chown - Change Owner",
                syntax: "chown [options] owner[:group] file...",
                description: "Changes the owner and group of files and directories.",
                examples: [
                    "chown user file.txt - Change owner to user",
                    "chown user:group file.txt - Change owner and group",
                    "chown -R user directory/ - Recursively change owner",
                    "chown :group file.txt - Change only group"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "ls -l important.txt" },
                    { output: "-rw-r--r-- 1 root root 456 Jan 15 10:30 important.txt" },
                    { prompt: "user@linux:~$", command: "sudo chown user important.txt" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls -l important.txt" },
                    { output: "-rw-r--r-- 1 user root 456 Jan 15 10:30 important.txt" }
                ]
            },
            passwd: {
                title: "passwd - Change Password",
                syntax: "passwd [options] [username]",
                description: "Changes user password.",
                examples: [
                    "passwd - Change current user's password",
                    "passwd username - Change password for specific user (admin only)",
                    "passwd -l username - Lock user account",
                    "passwd -u username - Unlock user account"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "passwd" },
                    { output: "Changing password for user.<br>Current password: <span class='terminal-highlight'>********</span><br>New password: <span class='terminal-highlight'>********</span><br>Retype new password: <span class='terminal-highlight'>********</span><br>passwd: password updated successfully" }
                ]
            },
            who: {
                title: "who - Show Logged Users",
                syntax: "who [options] [file]",
                description: "Shows who is logged on to the system.",
                examples: [
                    "who - Show all logged users",
                    "who am i - Show current user",
                    "who -q - Show user count only",
                    "who -H - Show with headers"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "who" },
                    { output: "user     pts/0        2024-01-15 10:30 (192.168.1.100)<br>admin    pts/1        2024-01-15 11:15 (192.168.1.101)" }
                ]
            }
        }
    },
    scripting: {
        title: "Scripting",
        commands: {
            bash: {
                title: "bash - GNU Bourne-Again Shell",
                syntax: "bash [script.sh]",
                description: "Runs a shell script or starts an interactive shell session.",
                examples: [
                    "bash script.sh - Run a shell script",
                    "bash - Start an interactive shell"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "bash --version" },
                    { output: "GNU bash, version 5.0.17(1)-release (x86_64-pc-linux-gnu)\nCopyright (C) 2019 Free Software Foundation, Inc." },
                    { prompt: "user@linux:~$", command: "bash myscript.sh" },
                    { output: "Hello from myscript!" }
                ]
            },
            shebang: {
                title: "Shebang (#!) - Script Interpreter Directive",
                syntax: "#!/bin/bash",
                description: "Placed at the top of a script to specify the interpreter.",
                examples: [
                    "#!/bin/bash - Use Bash as the interpreter",
                    "#!/usr/bin/env python3 - Use Python 3"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "cat hello.sh" },
                    { output: "#!/bin/bash\necho Hello, world!" },
                    { prompt: "user@linux:~$", command: "chmod +x hello.sh" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "./hello.sh" },
                    { output: "Hello, world!" }
                ]
            },
            chmod: {
                title: "chmod +x - Make Script Executable",
                syntax: "chmod +x script.sh",
                description: "Gives execute permission to a script file.",
                examples: [
                    "chmod +x myscript.sh - Make script executable"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "chmod +x myscript.sh" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "ls -l myscript.sh" },
                    { output: "-rwxr-xr-x 1 user user 123 Jan 15 10:30 myscript.sh" }
                ]
            },
            echo: {
                title: "echo - Print Text",
                syntax: "echo [text]",
                description: "Prints text to the terminal or to a file.",
                examples: [
                    "echo Hello - Print Hello",
                    "echo $PATH - Print value of PATH variable"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "echo Hello, scripting!" },
                    { output: "Hello, scripting!" }
                ]
            }
        }
    },
    package: {
        title: "Package Management",
        commands: {
            apt: {
                title: "apt - Advanced Package Tool (Debian/Ubuntu)",
                syntax: "apt [options] [package]",
                description: "Manages packages on Debian-based systems.",
                examples: [
                    "sudo apt update - Update package lists",
                    "sudo apt install nginx - Install nginx",
                    "sudo apt remove nginx - Remove nginx"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo apt update" },
                    { output: "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done" },
                    { prompt: "user@linux:~$", command: "sudo apt install nginx" },
                    { output: "Reading package lists... Done\nBuilding dependency tree\n...\nnginx installed successfully." }
                ]
            },
            yum: {
                title: "yum - Yellowdog Updater Modified (RHEL/CentOS)",
                syntax: "yum [options] [package]",
                description: "Manages packages on RHEL/CentOS systems.",
                examples: [
                    "sudo yum update - Update all packages",
                    "sudo yum install httpd - Install Apache",
                    "sudo yum remove httpd - Remove Apache"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo yum install httpd" },
                    { output: "Loaded plugins: fastestmirror\nResolving Dependencies\n--> Running transaction check\nInstalled: httpd.x86_64 0:2.4.6-97.el7\nComplete!" }
                ]
            },
            dnf: {
                title: "dnf - Dandified YUM (Fedora)",
                syntax: "dnf [options] [package]",
                description: "Manages packages on Fedora systems.",
                examples: [
                    "sudo dnf install vim - Install vim",
                    "sudo dnf remove vim - Remove vim"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo dnf install vim" },
                    { output: "Last metadata expiration check: 0:01:23 ago on Mon 15 Jan 2024 10:30:00 AM UTC.\nDependencies resolved.\nInstalled: vim-8.2.2637-1.fc33.x86_64\nComplete!" }
                ]
            },
            pacman: {
                title: "pacman - Package Manager (Arch)",
                syntax: "pacman [options] [package]",
                description: "Manages packages on Arch Linux systems.",
                examples: [
                    "sudo pacman -Syu - Update system",
                    "sudo pacman -S htop - Install htop",
                    "sudo pacman -R htop - Remove htop"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo pacman -S htop" },
                    { output: "resolving dependencies...\nlooking for conflicting packages...\nPackages (1) htop-3.0.5-1\nTotal Installed Size:  0.20 MiB\n:: Proceed with installation? [Y/n] y\n(1/1) installing htop...\n" }
                ]
            }
        }
    },
    disk: {
        title: "Disk Management",
        commands: {
            fdisk: {
                title: "fdisk - Partition Table Manipulator",
                syntax: "fdisk [options] [device]",
                description: "Manipulates disk partition tables.",
                examples: [
                    "sudo fdisk -l - List all partitions",
                    "sudo fdisk /dev/sda - Edit partitions on /dev/sda"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo fdisk -l" },
                    { output: "Disk /dev/sda: 100 GiB, 107374182400 bytes, 209715200 sectors\nDevice     Boot Start       End   Sectors  Size Id Type\n/dev/sda1  *     2048   2099199   2097152    1G 83 Linux\n/dev/sda2     2099200 209715199 207616000   99G 83 Linux" }
                ]
            },
            lsblk: {
                title: "lsblk - List Block Devices",
                syntax: "lsblk [options]",
                description: "Lists information about block devices.",
                examples: [
                    "lsblk - List all block devices"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "lsblk" },
                    { output: "NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda      8:0    0  100G  0 disk \n├─sda1   8:1    0    1G  0 part /boot\n└─sda2   8:2    0   99G  0 part /" }
                ]
            },
            mount: {
                title: "mount - Mount Filesystems",
                syntax: "mount [options] [device] [dir]",
                description: "Mounts a filesystem to a directory.",
                examples: [
                    "sudo mount /dev/sdb1 /mnt/usb - Mount USB drive"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo mount /dev/sdb1 /mnt/usb" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "df -h | grep /mnt/usb" },
                    { output: "/dev/sdb1        16G   1.2G   14G   8% /mnt/usb" }
                ]
            },
            du: {
                title: "du - Disk Usage",
                syntax: "du [options] [file|dir]",
                description: "Estimates file and directory space usage.",
                examples: [
                    "du -sh * - Show sizes of all files/folders in current directory"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "du -sh *" },
                    { output: "1.1G    Videos\n2.3G    Pictures\n512M    Documents" }
                ]
            }
        }
    },
    users: {
        title: "Users & Groups",
        commands: {
            useradd: {
                title: "useradd - Add User",
                syntax: "useradd [options] username",
                description: "Creates a new user account.",
                examples: [
                    "sudo useradd alice - Add user alice"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo useradd alice" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "id alice" },
                    { output: "uid=1002(alice) gid=1002(alice) groups=1002(alice)" }
                ]
            },
            usermod: {
                title: "usermod - Modify User",
                syntax: "usermod [options] username",
                description: "Modifies a user account.",
                examples: [
                    "sudo usermod -aG sudo alice - Add alice to sudo group"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo usermod -aG sudo alice" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "groups alice" },
                    { output: "alice : alice sudo" }
                ]
            },
            passwd: {
                title: "passwd - Change Password",
                syntax: "passwd [username]",
                description: "Changes a user's password.",
                examples: [
                    "sudo passwd alice - Change password for alice"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo passwd alice" },
                    { output: "Enter new UNIX password: <span class='terminal-highlight'>********</span>\nRetype new UNIX password: <span class='terminal-highlight'>********</span>\npasswd: password updated successfully" }
                ]
            },
            groupadd: {
                title: "groupadd - Add Group",
                syntax: "groupadd [options] groupname",
                description: "Creates a new group.",
                examples: [
                    "sudo groupadd devs - Add group devs"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo groupadd devs" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "getent group devs" },
                    { output: "devs:x:1003:" }
                ]
            },
            id: {
                title: "id - User Identity",
                syntax: "id [username]",
                description: "Prints user and group IDs.",
                examples: [
                    "id alice - Show IDs for alice"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "id alice" },
                    { output: "uid=1002(alice) gid=1002(alice) groups=1002(alice)" }
                ]
            }
        }
    },
    services: {
        title: "Services",
        commands: {
            systemctl: {
                title: "systemctl - Control Systemd Services",
                syntax: "systemctl [command] [service]",
                description: "Controls systemd system and service manager.",
                examples: [
                    "sudo systemctl status ssh - Show status of ssh",
                    "sudo systemctl start nginx - Start nginx service",
                    "sudo systemctl stop nginx - Stop nginx service"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo systemctl status ssh" },
                    { output: "● ssh.service - OpenBSD Secure Shell server\n   Loaded: loaded (/lib/systemd/system/ssh.service; enabled)\n   Active: active (running) since Mon 2024-01-15 10:30:00 UTC; 1h 2min ago" }
                ]
            },
            service: {
                title: "service - Run SysV Init Scripts",
                syntax: "service [service] [command]",
                description: "Controls SysV init scripts for services.",
                examples: [
                    "sudo service apache2 restart - Restart Apache2"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo service apache2 restart" },
                    { output: " * Restarting web server apache2    [ OK ]" }
                ]
            },
            journalctl: {
                title: "journalctl - Query Systemd Logs",
                syntax: "journalctl [options]",
                description: "Views logs collected by systemd-journald.",
                examples: [
                    "journalctl -u nginx - Show logs for nginx service"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "journalctl -u nginx --since today" },
                    { output: "-- Logs begin at Mon 2024-01-15 09:00:00 UTC, end at Mon 2024-01-15 11:00:00 UTC.\nJan 15 10:30:00 server systemd[1]: Started A high performance web server and a reverse proxy server." }
                ]
            },
            chkconfig: {
                title: "chkconfig - System Services (SysV)",
                syntax: "chkconfig [service] [on|off]",
                description: "Updates and queries runlevel information for system services.",
                examples: [
                    "sudo chkconfig httpd on - Enable httpd at boot"
                ],
                terminal: [
                    { prompt: "user@linux:~$", command: "sudo chkconfig httpd on" },
                    { output: "" },
                    { prompt: "user@linux:~$", command: "chkconfig --list httpd" },
                    { output: "httpd   0:off   1:off   2:on   3:on   4:on   5:on   6:off" }
                ]
            }
        }
    }
};

let currentCategory = null;
let currentCommand = null;
let typingSpeed = 30; // milliseconds per character

// Typing effect function
function typeText(element, text, callback = null) {
    element.innerHTML = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            // Handle HTML tags
            if (text.substring(i, i + 4) === '<br>') {
                element.innerHTML += '<br>';
                i += 4;
            } else if (text.substring(i, i + 6) === '<span ') {
                // Find the closing span tag
                const spanEnd = text.indexOf('</span>', i);
                if (spanEnd !== -1) {
                    const spanContent = text.substring(i, spanEnd + 7);
                    element.innerHTML += spanContent;
                    i = spanEnd + 7;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            
            // Scroll to bottom
            element.scrollTop = element.scrollHeight;
            
            // Continue typing
            setTimeout(typeChar, typingSpeed);
        } else {
            // Finished typing
            if (callback) callback();
        }
    }
    
    typeChar();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show categories by default
    showCategories();
    
    // Add typing effect to welcome message
    const terminal = document.getElementById('linux-terminal');
    const welcomeText = "Welcome to the Linux Commands Tutorial!<br>Select a category and command to start learning.";
    typeText(terminal, welcomeText);
});

// Show category selection
function showCategories() {
    const header = document.getElementById('linux-header');
    const categories = document.getElementById('command-categories');
    const main = document.getElementById('linux-main');
    
    // Show header and categories
    header.classList.remove('hidden');
    categories.classList.remove('hidden');
    
    // Hide main content
    main.classList.remove('active');
    
    currentCategory = null;
    currentCommand = null;
}

// Show commands for a specific category
function showCategory(categoryName) {
    const header = document.getElementById('linux-header');
    const categories = document.getElementById('command-categories');
    const main = document.getElementById('linux-main');
    const sidebar = document.getElementById('command-sidebar');
    
    // Hide header and categories
    header.classList.add('hidden');
    categories.classList.add('hidden');
    
    // Show main content
    main.classList.add('active');
    
    currentCategory = categoryName;
    const category = commandData[categoryName];
    
    // Populate sidebar with commands
    sidebar.innerHTML = '';
    Object.keys(category.commands).forEach(commandKey => {
        const command = category.commands[commandKey];
        const commandItem = document.createElement('div');
        commandItem.className = 'command-item';
        commandItem.textContent = command.title;
        commandItem.onclick = () => showCommand(categoryName, commandKey);
        sidebar.appendChild(commandItem);
    });
    
    // Show first command by default
    const firstCommandKey = Object.keys(category.commands)[0];
    if (firstCommandKey) {
        showCommand(categoryName, firstCommandKey);
    }
}

// Show specific command details
function showCommand(categoryName, commandKey) {
    const command = commandData[categoryName].commands[commandKey];
    const info = document.getElementById('command-info');
    const terminal = document.getElementById('linux-terminal');
    const sidebar = document.getElementById('command-sidebar');
    
    // Update selected command in sidebar
    const commandItems = sidebar.querySelectorAll('.command-item');
    commandItems.forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected');
    
    currentCommand = commandKey;
    
    // Update command info with typing effect
    info.style.opacity = '0';
    info.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        info.innerHTML = `
            <h2 class="command-title">${command.title}</h2>
            <div class="command-syntax">${command.syntax}</div>
            <p class="command-description">${command.description}</p>
            <div class="command-examples">
                <div class="example-title">Examples:</div>
                ${command.examples.map(example => `<div class="example-item">${example}</div>`).join('')}
            </div>
        `;
        
        info.style.transition = 'all 0.4s ease';
        info.style.opacity = '1';
        info.style.transform = 'translateY(0)';
    }, 200);
    
    // Clear terminal and start typing effect
    terminal.innerHTML = '';
    
    // Type out terminal content with delays between commands
    let commandIndex = 0;
    
    function typeNextCommand() {
        if (commandIndex < command.terminal.length) {
            const item = command.terminal[commandIndex];
            const terminalLine = document.createElement('div');
            terminalLine.className = 'terminal-output';
            terminal.appendChild(terminalLine);
            
            if (item.prompt) {
                // Type the prompt and command
                const promptText = `${item.prompt} ${item.command}`;
                typeText(terminalLine, promptText, () => {
                    // After typing command, wait a bit then type output if exists
                    setTimeout(() => {
                        if (item.output) {
                            const outputLine = document.createElement('div');
                            outputLine.className = 'terminal-output';
                            terminal.appendChild(outputLine);
                            typeText(outputLine, item.output, () => {
                                commandIndex++;
                                setTimeout(typeNextCommand, 500); // Wait before next command
                            });
                        } else {
                            commandIndex++;
                            setTimeout(typeNextCommand, 300); // Wait before next command
                        }
                    }, 800); // Wait after command is typed
                });
            } else if (item.output) {
                // Type just the output
                typeText(terminalLine, item.output, () => {
                    commandIndex++;
                    setTimeout(typeNextCommand, 300); // Wait before next command
                });
            } else {
                commandIndex++;
                setTimeout(typeNextCommand, 300);
            }
        }
    }
    
    // Start typing the first command
    setTimeout(typeNextCommand, 500);
} 