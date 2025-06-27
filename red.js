document.addEventListener('DOMContentLoaded', () => {
    // --- FLAT TOOL LIST (ensure all tools are present) ---
    const allTools = {
        nmap: {
            name: 'Nmap',
            guide: `
<h3>Nmap</h3>

<h4>What is Nmap?</h4>
<p><b>Nmap (Network Mapper)</b> is a powerful open-source tool for network discovery and security auditing. It is widely used for mapping networks, discovering hosts, open ports, services, OS fingerprinting, and more. Nmap is a standard tool for penetration testers, sysadmins, and network engineers.</p>
<p><b>Tip:</b> Nmap is safe to use on your own network, but always get permission before scanning networks you do not own.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <code>sudo apt install nmap</code></li>
  <li><b>RedHat/CentOS:</b> <code>sudo yum install nmap</code></li>
  <li><b>MacOS (Homebrew):</b> <code>brew install nmap</code></li>
  <li><b>Windows:</b> <a href='https://nmap.org/download.html' target='_blank'>Download from nmap.org</a></li>
</ul>
<p>After installation, run <code>nmap --version</code> to verify your setup.</p>

<h4>Basic Scan</h4>
<p>This command scans the most common 1,000 TCP ports on a target. It's a quick way to see which services are available on a host.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:00 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
9929/tcp open nping-echo
31337/tcp closed Elite
</pre></pre>
<p><b>Explanation:</b> The output lists open ports and their services. "Not shown: 997 closed ports" means only a few ports are open. The <code>ssh</code> and <code>http</code> services are running on ports 22 and 80.</p>

<h4>Scan a Port Range</h4>
<p>Use <code>-p</code> to specify which ports to scan. This is useful for focusing on a specific range or set of ports.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -p 1-100 192.168.1.1</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:01 UTC
Nmap scan report for 192.168.1.1
Host is up (0.01s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
</pre></pre>
<p><b>Explanation:</b> Only ports 1 through 100 are scanned. This can save time on large networks or when you only care about certain ports.</p>

<h4>Service/Version Detection</h4>
<p>The <code>-sV</code> option probes open ports to determine what service and version is running. This is helpful for vulnerability assessment and inventory.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -sV scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:02 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.6.1p1 Ubuntu
80/tcp open  http    Apache httpd 2.4.7 ((Ubuntu))
</pre></pre>
<p><b>Explanation:</b> The VERSION column shows the detected software. This can help identify outdated or vulnerable services.</p>

<h4>OS Detection</h4>
<p>Use <code>-O</code> to attempt to determine the target's operating system. Nmap analyzes network responses to guess the OS.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -O scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:03 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
OS details: Linux 3.2 - 4.9
</pre></pre>
<p><b>Explanation:</b> OS detection is not always 100% accurate, but it can give you a good idea of what the target is running.</p>

<h4>UDP Scan</h4>
<p>Scan UDP ports with <code>-sU</code>. UDP scans are slower and less reliable than TCP, but some services (like DNS and NTP) use UDP.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -sU -p 53,123 scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:04 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
PORT    STATE         SERVICE
53/udp  open          domain
123/udp open|filtered ntp
</pre></pre>
<p><b>Explanation:</b> UDP scans may show ports as "open|filtered" if Nmap can't tell if they're open or blocked by a firewall.</p>

<h4>Aggressive Scan</h4>
<p>The <code>-A</code> option enables OS detection, version detection, script scanning, and traceroute. This is a powerful but noisy scan that can be easily detected by security systems.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -A scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:05 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.6.1p1 Ubuntu
80/tcp open  http    Apache httpd 2.4.7 ((Ubuntu))

Host script results:
|_http-title: Example Domain

OS details: Linux 3.2 - 4.9
Traceroute: 1 hop max, 10 ms
</pre></pre>
<p><b>Explanation:</b> This scan provides a lot of information, but can be slow and is likely to trigger security alerts.</p>

<h4>Ping Scan (Host Discovery Only)</h4>
<p>Use <code>-sn</code> to check which hosts are up in a subnet without scanning ports. This is useful for network inventory or finding live hosts.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -sn 192.168.1.0/24</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:06 UTC
Nmap scan report for 192.168.1.1
Host is up (0.0010s latency).
Nmap scan report for 192.168.1.2
Host is up (0.0011s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 2.12 seconds
</pre></pre>
<p><b>Explanation:</b> Only hosts that respond to ping or ARP will be shown as "up." No port information is collected.</p>

<h4>Output Formats</h4>
<p>Nmap can save results in different formats for later analysis or reporting. Use <code>-oN</code> for normal, <code>-oX</code> for XML, and <code>-oG</code> for grepable output.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -oN output.txt scanme.nmap.org</span>

# output.txt will contain the normal output as shown above
</pre></pre>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -oX output.xml scanme.nmap.org</span>

# output.xml will contain XML-formatted results
</pre></pre>
<p><b>Tip:</b> Use <code>-oA basename</code> to save all formats at once (output will be basename.nmap, basename.xml, basename.gnmap).</p>

<h4>Nmap Scripting Engine (NSE)</h4>
<p>Nmap's scripting engine lets you automate advanced tasks like vulnerability scanning, brute force, and more. Use <code>--script</code> to specify scripts or categories.</p>
<p>For example, <code>--script vuln</code> runs all vulnerability detection scripts.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap --script vuln scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:07 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
PORT   STATE SERVICE
80/tcp open  http
|_vuln: No vulnerabilities found
</pre></pre>
<p><b>Explanation:</b> The script output is shown under the relevant port. You can find more scripts in <code>/usr/share/nmap/scripts/</code> or on the <a href='https://nmap.org/nsedoc/' target='_blank'>NSE documentation</a>.</p>

<h4>Firewall Evasion Example</h4>
<p>Use options like <code>-f</code> to fragment packets and try to bypass simple firewalls. These techniques may help avoid detection, but can also cause incomplete results or be flagged as suspicious.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>nmap -f scanme.nmap.org</span>

Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:08 UTC
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.10s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
</pre></pre>
<p><b>Warning:</b> Firewall evasion techniques may be illegal or against policy on networks you do not own. Use responsibly.</p>

<h4>Security Considerations</h4>
<ul>
  <li>Scanning networks you do not own or have permission to test may be illegal or against policy.</li>
  <li>Nmap scans can be detected by IDS/IPS and may trigger alerts.</li>
  <li>Use stealth and evasion options responsibly.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://nmap.org/book/man.html' target='_blank'>Nmap Official Documentation</a></li>
  <li><a href='https://nmap.org/nsedoc/' target='_blank'>Nmap Scripting Engine Docs</a></li>
  <li><a href='https://nmap.org/download.html' target='_blank'>Nmap Downloads</a></li>
  <li><a href='https://github.com/nmap/nmap' target='_blank'>Nmap on GitHub</a></li>
</ul>
`,
            commands: {
                "nmap -A -T4 scanme.nmap.org": "Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:00 UTC\nNmap scan report for <span class='term-dir'>scanme.nmap.org</span> (45.33.32.156)\nHost is up (0.10s latency).\nNot shown: 995 closed ports\nPORT     STATE SERVICE VERSION\n22/tcp   open  ssh     OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)\n80/tcp   open  http    Apache httpd 2.4.7 ((Ubuntu))\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n",
                "nmap -p 1-1000 192.168.1.1": "Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:01 UTC\nNmap scan report for <span class='term-dir'>192.168.1.1</span>\nHost is up (0.01s latency).\n<span class='term-number'>PORT    STATE SERVICE</span>\n<span class='term-number'>22</span>/tcp  open  <span class='term-match'>ssh</span>\n<span class='term-number'>80</span>/tcp  open  <span class='term-match'>http</span>\n<span class='term-number'>443</span>/tcp open  <span class='term-match'>https</span>\nNmap done: 1 IP address (1 host up) scanned in <span class='term-number'>2.12</span> seconds",
                "nmap -sS 192.168.1.1": "Starting Nmap 7.93 ( https://nmap.org ) at 2024-06-01 12:01 UTC\nNmap scan report for <span class='term-dir'>192.168.1.1</span>\nHost is up (0.01s latency).\n<span class='term-number'>PORT    STATE SERVICE</span>\n<span class='term-number'>22</span>/tcp  open  <span class='term-match'>ssh</span>\n<span class='term-number'>80</span>/tcp  open  <span class='term-match'>http</span>\n<span class='term-number'>443</span>/tcp open  <span class='term-match'>https</span>\nNmap done: 1 IP address (1 host up) scanned in <span class='term-number'>2.12</span> seconds"
            },
            description: 'Network mapping, port scanning, and service enumeration.'
        },
        'recon-ng': {
            name: 'Recon-ng',
            guide: `
<h3>Recon-ng</h3>

<h4>What is Recon-ng?</h4>
<p><b>Recon-ng</b> is a powerful open-source web reconnaissance framework written in Python. It provides a modular environment for open-source intelligence (OSINT) gathering, automating many common recon tasks for penetration testers and security researchers.</p>
<p><b>Tip:</b> Recon-ng is safe to use for passive information gathering, but always get permission before targeting domains you do not own.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <code>sudo apt install recon-ng</code></li>
  <li><b>MacOS (Homebrew):</b> <code>brew install recon-ng</code></li>
  <li><b>Windows:</b> <a href='https://github.com/lanmaster53/recon-ng' target='_blank'>Download from GitHub</a> and run with Python 3</li>
</ul>
<p>After installation, run <code>recon-ng --version</code> to verify your setup.</p>

<h4>Starting Recon-ng</h4>
<p>Launch the Recon-ng console to begin your reconnaissance session.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>recon-ng</span>

Welcome to Recon-ng v5.1.2
[recon-ng][default] >
</pre></pre>
<p><b>Explanation:</b> You are now in the Recon-ng interactive shell, ready to load modules and gather information.</p>

<h4>Searching for Modules</h4>
<p>Use <code>modules search</code> to find modules related to your target (e.g., domain, hosts, contacts).</p>
<pre class='terminal-screenshot'><pre>[recon-ng][default] > <span class='term-cmd'>modules search domain</span>

Found 5 modules:
- recon/domains-hosts/google_site_web
- recon/domains-contacts/whois_pocs
...</pre></pre>
<p><b>Explanation:</b> This command lists all modules related to domain reconnaissance. Modules are organized by category and function.</p>

<h4>Loading a Module</h4>
<p>Load a specific module to perform a task, such as finding hosts related to a domain.</p>
<pre class='terminal-screenshot'><pre>[recon-ng][default] > <span class='term-cmd'>modules load recon/domains-hosts/google_site_web</span>

Module loaded.</pre></pre>
<p><b>Explanation:</b> The selected module is now active. You can set options and run it.</p>

<h4>Setting Module Options</h4>
<p>Most modules require you to set options, such as the target domain.</p>
<pre class='terminal-screenshot'><pre>[recon-ng][recon/domains-hosts/google_site_web] > <span class='term-cmd'>options set SOURCE example.com</span>

SOURCE => example.com</pre></pre>
<p><b>Explanation:</b> The <code>SOURCE</code> option is set to your target domain. Use <code>options list</code> to see all available options for the module.</p>

<h4>Running the Module</h4>
<p>Execute the loaded module to gather information.</p>
<pre class='terminal-screenshot'><pre>[recon-ng][recon/domains-hosts/google_site_web] > <span class='term-cmd'>run</span>

[*] Searching Google for hosts related to example.com...
[+] Found: www.example.com
[+] Found: mail.example.com</pre></pre>
<p><b>Explanation:</b> The module queries Google and returns discovered hosts related to the target domain.</p>

<h4>Viewing Collected Data</h4>
<p>Recon-ng stores results in a workspace database. Use <code>show hosts</code> to view discovered hosts.</p>
<pre class='terminal-screenshot'><pre>[recon-ng][default] > <span class='term-cmd'>show hosts</span>

+-------------------+
| host              |
+-------------------+
| www.example.com   |
| mail.example.com  |
+-------------------+</pre></pre>
<p><b>Explanation:</b> This command displays all hosts found during your session.</p>

<h4>Exporting Results</h4>
<p>Export your findings for reporting or further analysis.</p>
<pre class='terminal-screenshot'><pre>[recon-ng][default] > <span class='term-cmd'>export csv results.csv</span>

[*] Exported data to results.csv</pre></pre>
<p><b>Explanation:</b> Results are saved in CSV format for easy sharing or import into other tools.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use <code>workspaces</code> to organize different projects or targets.</li>
  <li>Explore the <code>marketplace</code> to install additional modules.</li>
  <li>Always review module options before running to ensure accurate results.</li>
  <li>Respect privacy and legal boundaries when gathering OSINT.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/lanmaster53/recon-ng' target='_blank'>Recon-ng on GitHub</a></li>
  <li><a href='https://bitbucket.org/LaNMaSteR53/recon-ng/wiki/Home' target='_blank'>Recon-ng Wiki & Documentation</a></li>
  <li><a href='https://www.kali.org/tools/recon-ng/' target='_blank'>Recon-ng on Kali Tools</a></li>
</ul>
`,
            commands: {
                "recon-ng": "Welcome to Recon-ng v5.1.2\n[recon-ng][default] > ",
                "modules search domain": "[recon-ng][default] > modules search domain\nFound 5 modules:\n- recon/domains-hosts/google_site_web\n- recon/domains-contacts/whois_pocs\n...",
                "modules load recon/domains-hosts/google_site_web": "[recon-ng][default] > modules load recon/domains-hosts/google_site_web\nModule loaded.",
                "run": "[*] Searching Google for hosts related to example.com...\n[+] Found: www.example.com\n[+] Found: mail.example.com"
            },
            description: 'Modular OSINT and reconnaissance automation.'
        },
        theharvester: {
            name: 'theHarvester',
            guide: `
<h3>theHarvester</h3>

<h4>What is theHarvester?</h4>
<p><b>theHarvester</b> is an open-source OSINT tool for gathering emails, subdomains, hosts, employee names, and open ports from public sources such as search engines and PGP key servers. It is widely used for reconnaissance in penetration testing and red teaming.</p>
<p><b>Tip:</b> theHarvester is passive and safe for information gathering, but always get permission before targeting domains you do not own.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <code>sudo apt install theharvester</code></li>
  <li><b>MacOS (Homebrew):</b> <code>brew install theharvester</code></li>
  <li><b>Windows:</b> <a href='https://github.com/laramies/theHarvester' target='_blank'>Download from GitHub</a> and run with Python 3</li>
</ul>
<p>After installation, run <code>theharvester --version</code> to verify your setup.</p>

<h4>Basic Domain Search</h4>
<p>Search for emails and subdomains related to a domain using a specific search engine (e.g., Google).</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>theharvester -d example.com -b google</span>

theHarvester v4.2.0
[*] Searching Google for emails, hosts, and subdomains...
[+] Emails found:
  admin@example.com
  support@example.com
[+] Hosts found:
  www.example.com
  mail.example.com
</pre></pre>
<p><b>Explanation:</b> This command queries Google for emails and subdomains related to <code>example.com</code>. The <code>-d</code> option specifies the domain, and <code>-b</code> selects the data source (Google).</p>

<h4>Using Different Data Sources</h4>
<p>theHarvester supports multiple sources, such as Bing, Yahoo, LinkedIn, and more. Use <code>-b</code> to specify the source.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>theharvester -d example.com -b bing</span>

theHarvester v4.2.0
[*] Searching Bing for emails, hosts, and subdomains...
[+] Emails found:
  info@example.com
[+] Hosts found:
  blog.example.com
</pre></pre>
<p><b>Explanation:</b> This command uses Bing as the data source. Try different sources for more comprehensive results.</p>

<h4>Output Formats</h4>
<p>Export results to HTML or XML for reporting or further analysis.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>theharvester -d example.com -b google -f results.html</span>

[*] Results saved to results.html
</pre></pre>
<p><b>Explanation:</b> The <code>-f</code> option saves the results in HTML format. You can open the file in a browser for a report-style view.</p>

<h4>Common Options</h4>
<ul>
  <li><code>-d &lt;domain&gt;</code>: Target domain to search</li>
  <li><code>-b &lt;source&gt;</code>: Data source (google, bing, yahoo, linkedin, etc.)</li>
  <li><code>-l &lt;limit&gt;</code>: Limit the number of results (default: 500)</li>
  <li><code>-f &lt;filename&gt;</code>: Output file (HTML or XML)</li>
  <li><code>-h</code>: Show help and all options</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Try multiple sources for more complete results.</li>
  <li>Use the <code>-l</code> option to limit results if you only need a sample.</li>
  <li>Review the output for false positives and verify findings before reporting.</li>
  <li>Respect privacy and legal boundaries when gathering OSINT.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/laramies/theHarvester' target='_blank'>theHarvester on GitHub</a></li>
  <li><a href='https://tools.kali.org/information-gathering/theharvester' target='_blank'>theHarvester on Kali Tools</a></li>
  <li><a href='https://www.kali.org/tools/theharvester/' target='_blank'>theHarvester Official Docs</a></li>
</ul>
`,
            commands: {
                "theharvester -d example.com -b google": "theHarvester v4.2.0\n[*] Searching Google for emails, hosts, and subdomains...\n[+] Emails found:\n  admin@example.com\n  support@example.com\n[+] Hosts found:\n  www.example.com\n  mail.example.com",
                "theharvester -d example.com -b bing": "theHarvester v4.2.0\n[*] Searching Bing for emails, hosts, and subdomains...\n[+] Emails found:\n  info@example.com\n[+] Hosts found:\n  blog.example.com"
            },
            description: 'Email, subdomain, and host OSINT.'
        },
        shodan: {
            name: 'Shodan',
            guide: `
<h3>Shodan</h3>

<h4>What is Shodan?</h4>
<p><b>Shodan</b> is a search engine for Internet-connected devices. It allows users to discover servers, webcams, routers, industrial control systems, and more, exposed to the public internet. Shodan is widely used for reconnaissance, asset discovery, and vulnerability research.</p>
<p><b>Warning:</b> Shodan can reveal sensitive information about exposed devices. Always use it ethically and respect privacy and legal boundaries.</p>

<h4>Installation</h4>
<ul>
  <li><b>Python (all platforms):</b> <code>pip install shodan</code></li>
  <li><b>Official CLI:</b> <a href='https://cli.shodan.io/' target='_blank'>Download from Shodan CLI</a></li>
  <li><b>Web Interface:</b> <a href='https://www.shodan.io/' target='_blank'>Use Shodan online</a></li>
</ul>
<p>After installation, set your API key with <code>shodan init &lt;API_KEY&gt;</code>. You can get a free API key by registering at <a href='https://account.shodan.io/register' target='_blank'>Shodan.io</a>.</p>

<h4>Searching for Devices</h4>
<p>Find devices running a specific service (e.g., Apache HTTP Server).</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>shodan search apache</span>

Results for search: apache
[1] 203.0.113.10:80 - Apache httpd 2.4.29 (Ubuntu)
[2] 198.51.100.5:8080 - Apache Tomcat 9.0.31
</pre></pre>
<p><b>Explanation:</b> This command searches Shodan for devices with "apache" in their banners. The results show IP addresses, ports, and service details.</p>

<h4>Getting Host Information</h4>
<p>Retrieve detailed information about a specific IP address.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>shodan host 8.8.8.8</span>

Host details for 8.8.8.8:
  Organization: Google LLC
  Operating System: Linux
  Open Ports: 53/tcp, 443/tcp
</pre></pre>
<p><b>Explanation:</b> This command shows the organization, OS, and open ports for the given IP address.</p>

<h4>Filtering Search Results</h4>
<p>Use filters to narrow your search (e.g., by country, port, or organization).</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>shodan search apache country:US port:80</span>

Results for search: apache country:US port:80
[1] 203.0.113.10:80 - Apache httpd 2.4.29 (Ubuntu)
</pre></pre>
<p><b>Explanation:</b> This command finds Apache servers in the US on port 80. You can combine multiple filters for precise results.</p>

<h4>Exporting Results</h4>
<p>Save your search results to a file for later analysis.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>shodan search apache --limit 10 --fields ip_str,port --separator , > results.csv</span>

# results.csv will contain a CSV list of IP addresses and ports
</pre></pre>
<p><b>Explanation:</b> The <code>--fields</code> and <code>--separator</code> options let you customize the output for easy import into spreadsheets or other tools.</p>

<h4>Common Options</h4>
<ul>
  <li><code>shodan search &lt;query&gt;</code>: Search for devices/services</li>
  <li><code>shodan host &lt;IP&gt;</code>: Get info about a specific host</li>
  <li><code>--fields</code>: Specify which fields to display</li>
  <li><code>--limit</code>: Limit the number of results</li>
  <li><code>--separator</code>: Set the output separator (e.g., comma)</li>
  <li><code>shodan init &lt;API_KEY&gt;</code>: Set your API key</li>
  <li><code>shodan info</code>: Show your account information and API usage</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use filters to narrow your search and avoid information overload.</li>
  <li>Respect privacy and legal boundaries—never attempt to access or exploit discovered devices without permission.</li>
  <li>Monitor your API usage to avoid hitting rate limits.</li>
  <li>Shodan's web interface offers advanced search and visualization features.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.shodan.io/' target='_blank'>Shodan Official Website</a></li>
  <li><a href='https://cli.shodan.io/' target='_blank'>Shodan CLI Documentation</a></li>
  <li><a href='https://github.com/achillean/shodan-python' target='_blank'>Shodan Python Library on GitHub</a></li>
</ul>
`,
            commands: {
                "shodan search apache": "Results for search: apache\n[1] 203.0.113.10:80 - Apache httpd 2.4.29 (Ubuntu)\n[2] 198.51.100.5:8080 - Apache Tomcat 9.0.31",
                "shodan host 8.8.8.8": "Host details for 8.8.8.8:\n  Organization: Google LLC\n  Operating System: Linux\n  Open Ports: 53/tcp, 443/tcp"
            },
            description: 'Internet device search engine.'
        },
        spiderfoot: {
            name: 'SpiderFoot',
            guide: `
<h3>SpiderFoot</h3>

<h4>What is SpiderFoot?</h4>
<p><b>SpiderFoot</b> is an open-source automation tool for gathering intelligence on IPs, domains, emails, and more. It is used for threat intelligence, reconnaissance, and attack surface mapping. SpiderFoot can be run via a web UI or command line and supports custom scan profiles.</p>
<p><b>Tip:</b> SpiderFoot automates OSINT from dozens of sources. Always use it ethically and with permission.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <code>sudo apt install spiderfoot</code> or <code>pip install spiderfoot</code></li>
  <li><b>MacOS (Homebrew):</b> <code>brew install spiderfoot</code></li>
  <li><b>Windows:</b> <a href='https://github.com/smicallef/spiderfoot' target='_blank'>Download from GitHub</a> and run with Python 3</li>
</ul>
<p>After installation, run <code>spiderfoot --version</code> to verify your setup.</p>

<h4>Basic Domain Scan (CLI)</h4>
<p>Scan a domain for emails, subdomains, and other OSINT data.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>spiderfoot -s example.com</span>

SpiderFoot v4.0
[*] Starting scan of example.com...
[+] Found 3 emails: admin@example.com, info@example.com, abuse@example.com
[+] Found 2 subdomains: mail.example.com, vpn.example.com
</pre></pre>
<p><b>Explanation:</b> This command starts a scan of <code>example.com</code> and reports discovered emails and subdomains. The <code>-s</code> option specifies the target.</p>

<h4>Scanning an IP Address</h4>
<p>SpiderFoot can also scan IP addresses for threat intelligence and OSINT data.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>spiderfoot -s 8.8.8.8</span>

SpiderFoot v4.0
[*] Starting scan of 8.8.8.8...
[+] Found 1 ASN: AS15169 (Google LLC)
</pre></pre>
<p><b>Explanation:</b> This command scans the IP address <code>8.8.8.8</code> and reports associated Autonomous System Numbers (ASNs) and other data.</p>

<h4>Using the Web UI</h4>
<p>SpiderFoot offers a powerful web interface for managing scans and viewing results.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>spiderfoot -l 127.0.0.1:5001</span>

[*] Starting SpiderFoot web server at http://127.0.0.1:5001
</pre></pre>
<p><b>Explanation:</b> This command launches the web UI. Open the URL in your browser to configure and run scans interactively.</p>

<h4>Common Options</h4>
<ul>
  <li><code>-s &lt;target&gt;</code>: Target domain, IP, hostname, or subnet</li>
  <li><code>-l &lt;ip:port&gt;</code>: Start the web server on the specified address</li>
  <li><code>-m &lt;module&gt;</code>: Run only the specified module(s)</li>
  <li><code>-t &lt;type&gt;</code>: Specify the type of scan (domain, ip, etc.)</li>
  <li><code>-o &lt;format&gt;</code>: Output format (csv, json, etc.)</li>
  <li><code>-h</code>: Show help and all options</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use the web UI for large or complex scans—it provides better visualization and management.</li>
  <li>Review and configure modules to focus your scan and reduce noise.</li>
  <li>Respect privacy and legal boundaries when gathering OSINT.</li>
  <li>Check the output for false positives and verify findings before reporting.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.spiderfoot.net/' target='_blank'>SpiderFoot Official Website</a></li>
  <li><a href='https://github.com/smicallef/spiderfoot' target='_blank'>SpiderFoot on GitHub</a></li>
  <li><a href='https://www.kali.org/tools/spiderfoot/' target='_blank'>SpiderFoot on Kali Tools</a></li>
</ul>
`,
            commands: {
                "spiderfoot -s example.com": "SpiderFoot v4.0\n[*] Starting scan of example.com...\n[+] Found 3 emails: admin@example.com, info@example.com, abuse@example.com\n[+] Found 2 subdomains: mail.example.com, vpn.example.com",
                "spiderfoot -s 8.8.8.8": "SpiderFoot v4.0\n[*] Starting scan of 8.8.8.8...\n[+] Found 1 ASN: AS15169 (Google LLC)"
            },
            description: 'Automated OSINT and threat intelligence.'
        },
        maltego: {
            name: 'Maltego',
            guide: `
<h3>Maltego</h3>

<h4>What is Maltego?</h4>
<p><b>Maltego</b> is a data mining and link analysis tool for OSINT and cyber threat intelligence. It allows you to visualize relationships between people, groups, websites, domains, infrastructure, and more. Maltego is widely used for mapping digital footprints and investigating cyber threats.</p>
<p><b>Tip:</b> Maltego is especially powerful for visualizing connections and pivoting from one piece of data to another. Always use it ethically and with permission.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <a href='https://www.maltego.com/downloads/' target='_blank'>Download the .deb package from Maltego</a></li>
  <li><b>MacOS:</b> <a href='https://www.maltego.com/downloads/' target='_blank'>Download the .dmg package from Maltego</a></li>
  <li><b>Windows:</b> <a href='https://www.maltego.com/downloads/' target='_blank'>Download the .exe installer from Maltego</a></li>
</ul>
<p>After installation, launch Maltego and create a free account to access community transforms.</p>

<h4>Launching Maltego</h4>
<p>Start the Maltego GUI from your applications menu or terminal.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>maltego</span>

Maltego GUI started.
</pre></pre>
<p><b>Explanation:</b> The Maltego application window will open, allowing you to create new investigations (graphs). You can also launch Maltego from the Start menu (Windows) or Applications folder (Mac).</p>

<h4>Adding Entities to the Graph</h4>
<p>Begin your investigation by adding an entity, such as a domain, to the graph. Entities are the basic building blocks in Maltego and represent real-world objects (domains, IPs, emails, people, etc.).</p>
<pre class='terminal-screenshot'><pre>[Graph] <span class='term-cmd'>Add entity: example.com (Domain)</span>

[Graph] Added entity: example.com (Domain)
</pre></pre>
<p><b>Explanation:</b> To add an entity, drag it from the left sidebar (Entity Palette) onto the graph, or right-click and select "Add Entity." You can double-click the entity to edit its value (e.g., set the domain name).</p>
<ul>
  <li><b>Entity Type:</b> Choose from Domain, IP Address, Person, Email, etc.</li>
  <li><b>Entity Value:</b> The specific value you want to investigate (e.g., <code>example.com</code>).</li>
</ul>

<h4>Running Transforms</h4>
<p>Transforms are automated queries that discover related data for an entity. For example, you can find IP addresses associated with a domain. Right-click an entity and select a transform from the context menu.</p>
<pre class='terminal-screenshot'><pre>[Graph] <span class='term-cmd'>Run transform: To IP Address</span>

[Graph] example.com
  |-- 93.184.216.34 (A record)
</pre></pre>
<p><b>Explanation:</b> 
<ul>
  <li><b>Run transform:</b> Right-click the entity and choose a transform (e.g., "To IP Address"). Transforms are grouped by function (DNS, infrastructure, social, etc.).</li>
  <li><b>To IP Address:</b> This transform queries DNS records to find the IP address (A record) for the domain.</li>
  <li><b>Result:</b> The graph updates to show the new entity (IP address) connected to the original domain.</li>
</ul>

<h4>Visualizing Relationships</h4>
<p>Maltego automatically draws connections between entities, making it easy to spot relationships and patterns. You can run multiple transforms to expand the graph.</p>
<pre class='terminal-screenshot'><pre>[Graph] example.com
  |-- 93.184.216.34 (A record)
  |-- admin@example.com (Email)
  |-- www.example.com (Subdomain)
</pre></pre>
<p><b>Explanation:</b> 
<ul>
  <li><b>Multiple Transforms:</b> You can run transforms like "To Email Address" or "To Subdomain" to discover more related entities.</li>
  <li><b>Graph View:</b> The graph visually represents how entities are connected, helping you identify infrastructure, relationships, or potential attack paths.</li>
</ul>

<h4>Exporting and Reporting</h4>
<p>Export your graph and findings for reporting or further analysis. Use the Export menu or right-click the graph background.</p>
<pre class='terminal-screenshot'><pre>[Graph] <span class='term-cmd'>Export: PDF</span>

[+] Graph exported to report.pdf
</pre></pre>
<p><b>Explanation:</b> 
<ul>
  <li><b>Export: PDF:</b> Saves the current graph as a PDF report. You can also export as CSV, image, or Maltego graph file for sharing or further analysis.</li>
  <li><b>Export Options:</b> Choose which entities and relationships to include in the export.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>Entity Palette:</b> The sidebar where you select and drag entities onto the graph.</li>
  <li><b>Transforms:</b> Right-click an entity to see available transforms. Hover for descriptions of what each transform does.</li>
  <li><b>Filters:</b> Use the filter bar to show/hide certain entity types or relationships.</li>
  <li><b>Layouts:</b> Change the graph layout (hierarchical, circular, organic) for better visualization.</li>
  <li><b>Notes:</b> Add notes to entities or the graph for documentation.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use community transforms for free, or purchase commercial transforms for more data sources.</li>
  <li>Right-click entities to see available transforms and options. Hover over transforms for detailed descriptions.</li>
  <li>Use filters and layouts to manage large graphs and focus on relevant data.</li>
  <li>Respect privacy and legal boundaries when mapping relationships.</li>
  <li>Save your work frequently, especially during large investigations.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.maltego.com/' target='_blank'>Maltego Official Website</a></li>
  <li><a href='https://docs.maltego.com/' target='_blank'>Maltego Documentation</a></li>
  <li><a href='https://www.paterva.com/web7/community/community.php' target='_blank'>Maltego Community Portal</a></li>
</ul>
`,
            commands: {
                "maltego": "Maltego GUI started.",
                "add entity: Domain": "[Graph] Added entity: example.com (Domain)",
                "run transform: To IP Address": "[Graph] example.com\n  |-- 93.184.216.34 (A record)"
            },
            description: 'Graph-based OSINT and link analysis.'
        },
        foca: {
            name: 'FOCA',
            guide: `
<h3>FOCA</h3>

<h4>What is FOCA?</h4>
<p><b>FOCA</b> (Fingerprinting Organizations with Collected Archives) is a tool for discovering metadata and hidden information in documents. It is used for information gathering and reconnaissance, especially for extracting sensitive data from public files (PDF, DOCX, XLSX, etc.). FOCA can reveal usernames, software versions, file paths, and more, which may help in further attacks or social engineering.</p>
<p><b>Warning:</b> FOCA can uncover sensitive internal information. Always use it ethically and with permission.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows:</b> <a href='https://www.elevenpaths.com/labstools/foca.html' target='_blank'>Download FOCA from ElevenPaths</a> (official GUI, Windows only)</li>
  <li><b>Linux/Mac:</b> Use alternatives like <a href='https://github.com/opsdisk/metagoofil' target='_blank'>Metagoofil</a> for similar functionality</li>
</ul>
<p>After installation, launch FOCA from the Start menu or desktop shortcut.</p>

<h4>Scanning a Website for Documents</h4>
<p>FOCA can automatically search a website for downloadable documents and extract metadata from them.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>C:\Users\User&gt;</span> <span class='term-cmd'>foca scan http://example.com/docs</span>

Scanning http://example.com/docs...
[+] Found: annual_report.pdf
[+] Extracted metadata:
  Author: John Doe
  Company: Example Corp
  Software: Microsoft Word 2019
  File Path: C:\\Users\\jdoe\\Documents\\annual_report.pdf
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>scan:</b> Tells FOCA to search the specified URL for documents (PDF, DOCX, XLSX, etc.).</li>
  <li><b>http://example.com/docs:</b> The target website or directory to scan for files.</li>
  <li><b>Found:</b> Lists each document discovered on the site.</li>
  <li><b>Extracted metadata:</b> Shows details like author, company, software used, and file paths, which can reveal usernames, internal structure, or software versions.</li>
</ul>

<h4>Analyzing a Specific Document</h4>
<p>You can analyze a downloaded document for metadata using FOCA.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>C:\Users\User&gt;</span> <span class='term-cmd'>foca analyze report.pdf</span>

Analyzing report.pdf...
[+] Author: Jane Smith
[+] Created: 2023-05-01
[+] Last Modified: 2023-05-10
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>analyze:</b> Tells FOCA to extract metadata from a specific file.</li>
  <li><b>report.pdf:</b> The file to analyze (must be accessible on your system).</li>
  <li><b>Author, Created, Last Modified:</b> Metadata fields that can reveal who created the document and when.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>scan &lt;url&gt;:</b> Scan a website or directory for documents to analyze.</li>
  <li><b>analyze &lt;file&gt;:</b> Extract metadata from a specific file.</li>
  <li><b>Export:</b> Save results to CSV, HTML, or XML for reporting.</li>
  <li><b>Filters:</b> Limit search to specific file types (e.g., only PDFs or DOCX).</li>
  <li><b>GUI Actions:</b> In the FOCA GUI, use the "Add Site" button to specify a target, then "Analyze" to extract metadata from found documents.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Review extracted metadata for usernames, internal paths, and software versions—these can be valuable for social engineering or further attacks.</li>
  <li>Use filters to focus on relevant file types and reduce noise.</li>
  <li>Always respect privacy and legal boundaries when analyzing documents.</li>
  <li>Combine FOCA with other OSINT tools for a more complete picture.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.elevenpaths.com/labstools/foca.html' target='_blank'>FOCA Official Website & Download</a></li>
  <li><a href='https://www.kali.org/tools/metagoofil/' target='_blank'>Metagoofil (Linux alternative)</a></li>
  <li><a href='https://www.youtube.com/watch?v=QwQb6QwF1nA' target='_blank'>FOCA Video Tutorial</a></li>
</ul>
`,
            commands: {
                "foca scan http://example.com/docs": "Scanning http://example.com/docs...\n[+] Found: annual_report.pdf\n[+] Extracted metadata:\n  Author: John Doe\n  Company: Example Corp\n  Software: Microsoft Word 2019\n  File Path: C:\\Users\\jdoe\\Documents\\annual_report.pdf",
                "foca analyze report.pdf": "Analyzing report.pdf...\n[+] Author: Jane Smith\n[+] Created: 2023-05-01\n[+] Last Modified: 2023-05-10"
            },
            description: 'Document metadata extraction and analysis.'
        },
        nessus: {
            name: 'Nessus',
            guide: `
<h3>Nessus</h3>

<h4>What is Nessus?</h4>
<p><b>Nessus</b> is a widely used vulnerability scanner for identifying security issues, misconfigurations, and missing patches across a wide range of systems and applications. Nessus is used by security professionals to assess networks, servers, and applications for known vulnerabilities and compliance issues.</p>
<p><b>Warning:</b> Vulnerability scanning can be intrusive. Only scan systems you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <a href='https://www.tenable.com/downloads/nessus' target='_blank'>Download the .deb package from Tenable</a></li>
  <li><b>RedHat/CentOS:</b> <a href='https://www.tenable.com/downloads/nessus' target='_blank'>Download the .rpm package from Tenable</a></li>
  <li><b>MacOS:</b> <a href='https://www.tenable.com/downloads/nessus' target='_blank'>Download the .dmg package from Tenable</a></li>
  <li><b>Windows:</b> <a href='https://www.tenable.com/downloads/nessus' target='_blank'>Download the .exe installer from Tenable</a></li>
</ul>
<p>After installation, start the Nessus service and access the web interface (usually at <code>https://localhost:8834</code>), then create an account and activate your license (free for home use).</p>

<h4>Starting a Basic Scan</h4>
<p>Create a new scan in the Nessus web interface to scan a subnet or range of IPs for vulnerabilities.</p>
<pre class='terminal-screenshot'><pre>[Web UI] <span class='term-cmd'>New Scan &rarr; Basic Network Scan</span>

Target: 192.168.1.0/24
[+] Scan started...
[+] 192.168.1.10 - 3 vulnerabilities found
[+] 192.168.1.15 - 1 vulnerability found
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>New Scan:</b> Click "New Scan" in the Nessus web UI and select "Basic Network Scan" to start a standard vulnerability scan.</li>
  <li><b>Target:</b> Enter the IP address, range, or subnet you want to scan (e.g., <code>192.168.1.0/24</code>).</li>
  <li><b>Scan started:</b> Nessus will begin scanning all specified hosts for open ports, services, and known vulnerabilities.</li>
  <li><b>Results:</b> Each host is listed with the number of vulnerabilities found.</li>
</ul>

<h4>Viewing and Interpreting Results</h4>
<p>After the scan completes, Nessus provides a detailed report for each host.</p>
<pre class='terminal-screenshot'><pre>[Web UI] <span class='term-cmd'>View Report: 192.168.1.10</span>

Report for 192.168.1.10:
  - CVE-2022-1234: Critical
  - CVE-2021-5678: Medium
  - CVE-2020-9999: Low
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>View Report:</b> Click on a host in the scan results to see detailed findings.</li>
  <li><b>CVE:</b> Each vulnerability is listed by its CVE identifier, severity (Critical, High, Medium, Low), and a description.</li>
  <li><b>Remediation:</b> Nessus provides recommendations for fixing each issue (patch, configuration change, etc.).</li>
</ul>

<h4>Exporting Reports</h4>
<p>Export scan results for sharing or further analysis.</p>
<pre class='terminal-screenshot'><pre>[Web UI] <span class='term-cmd'>Export &rarr; PDF</span>

[+] Report exported to nessus_report.pdf
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Export:</b> Use the "Export" button in the web UI to save results as PDF, CSV, or Nessus format.</li>
  <li><b>PDF:</b> Generates a printable report with all findings and recommendations.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>Scan Templates:</b> Choose from templates like Basic Network Scan, Advanced Scan, Web Application Scan, etc.</li>
  <li><b>Credentials:</b> Provide login credentials for authenticated scans (more thorough, can check for missing patches inside systems).</li>
  <li><b>Policies:</b> Customize scan settings (ports, plugins, performance, etc.).</li>
  <li><b>Schedules:</b> Set scans to run automatically at specified times.</li>
  <li><b>Filters:</b> Use filters to focus on specific vulnerabilities, hosts, or severity levels in the results.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always get permission before scanning networks or systems.</li>
  <li>Use authenticated scans for more accurate results.</li>
  <li>Review remediation recommendations and prioritize critical vulnerabilities.</li>
  <li>Schedule regular scans to maintain security posture.</li>
  <li>Export and archive reports for compliance and tracking.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.tenable.com/products/nessus' target='_blank'>Nessus Official Website</a></li>
  <li><a href='https://docs.tenable.com/nessus/' target='_blank'>Nessus Documentation</a></li>
  <li><a href='https://www.tenable.com/downloads/nessus' target='_blank'>Nessus Downloads</a></li>
</ul>
`,
            commands: {
                "nessus scan 192.168.1.0/24": "Starting Nessus scan of 192.168.1.0/24...\n[+] 192.168.1.10 - 3 vulnerabilities found\n[+] 192.168.1.15 - 1 vulnerability found",
                "nessus report 192.168.1.10": "Report for 192.168.1.10:\n  - CVE-2022-1234: Critical\n  - CVE-2021-5678: Medium\n  - CVE-2020-9999: Low"
            },
            description: 'Comprehensive vulnerability scanning.'
        },
        openvas: {
            name: 'OpenVAS',
            guide: `
<h3>OpenVAS</h3>

<h4>What is OpenVAS?</h4>
<p><b>OpenVAS</b> (Open Vulnerability Assessment System) is an open-source framework for scanning and managing vulnerabilities in networks and systems. It is part of the Greenbone Vulnerability Management (GVM) suite and is widely used for vulnerability assessment and compliance testing.</p>
<p><b>Warning:</b> Vulnerability scanning can be intrusive. Only scan systems you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Debian/Ubuntu:</b> <code>sudo apt install openvas</code> or <code>sudo apt install gvm</code></li>
  <li><b>Other Linux:</b> See <a href='https://greenbone.github.io/docs/' target='_blank'>Greenbone Docs</a> for detailed instructions</li>
  <li><b>Windows/Mac:</b> Use a Linux VM or Docker image (see official docs)</li>
</ul>
<p>After installation, run <code>sudo gvm-setup</code> to initialize, then <code>sudo gvm-start</code> to launch the web UI (usually at <code>https://localhost:9392</code>).</p>

<h4>Starting a Basic Scan</h4>
<p>Create a new scan in the OpenVAS (GVM) web interface to scan a subnet or range of IPs for vulnerabilities.</p>
<pre class='terminal-screenshot'><pre>[Web UI] <span class='term-cmd'>New Task &rarr; Full and Fast Scan</span>

Target: 10.0.0.0/24
[+] Scan started...
[+] 10.0.0.5 - 2 vulnerabilities found
[+] 10.0.0.8 - 0 vulnerabilities found
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>New Task:</b> Click "New Task" in the GVM web UI and select "Full and Fast Scan" to start a comprehensive vulnerability scan.</li>
  <li><b>Target:</b> Enter the IP address, range, or subnet you want to scan (e.g., <code>10.0.0.0/24</code>).</li>
  <li><b>Scan started:</b> OpenVAS will begin scanning all specified hosts for open ports, services, and known vulnerabilities.</li>
<p><b>Typical output:</b></p>
<pre>msf5 > search exploit/windows/smb/ms17_010_eternalblue
[+] Found exploit/windows/smb/ms17_010_eternalblue
msf5 > use exploit/windows/smb/ms17_010_eternalblue
msf5 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.20
RHOSTS => 192.168.1.20
msf5 exploit(windows/smb/ms17_010_eternalblue) > run
[*] Exploit completed, session 1 opened
</pre>`,
            commands: {
                "msfconsole": "msf5 > ",
                "search exploit/windows/smb/ms17_010_eternalblue": "msf5 > search exploit/windows/smb/ms17_010_eternalblue\n[+] Found exploit/windows/smb/ms17_010_eternalblue",
                "use exploit/windows/smb/ms17_010_eternalblue": "msf5 exploit(windows/smb/ms17_010_eternalblue) > ",
                "set RHOSTS 192.168.1.20": "RHOSTS => 192.168.1.20",
                "run": "[*] Exploit completed, session 1 opened"
            },
            description: 'Exploit development and penetration testing.'
        },
        'cobalt-strike': {
            name: 'Cobalt Strike',
            guide: `
<h3>Cobalt Strike</h3>

<h4>What is Cobalt Strike?</h4>
<p><b>Cobalt Strike</b> is a commercial threat emulation and post-exploitation tool used for red teaming and adversary simulations. It provides a powerful platform for simulating advanced attacks, managing beacons (malware implants), and controlling compromised systems. Cobalt Strike is widely used by professional penetration testers and red teams to mimic real-world adversaries.</p>
<p><b>Warning:</b> Cobalt Strike is a dual-use tool. Only use it in authorized, legal engagements.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows/Linux/Mac:</b> <a href='https://www.cobaltstrike.com/download' target='_blank'>Download from Cobalt Strike (requires license)</a></li>
  <li>Extract the archive and run <code>teamserver</code> (Linux) or <code>cobaltstrike.jar</code> (Java required) for the client.</li>
</ul>
<p>After installation, start the team server on your attack box and connect with the client.</p>

<h4>Starting the Team Server</h4>
<p>The team server is the Cobalt Strike backend that operators connect to. Start it with:</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>./teamserver 192.168.1.100 MySecretPassword</span>

[*] Team server started on 192.168.1.100 with password 'MySecretPassword'
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>192.168.1.100:</b> The IP address the team server will listen on (your attack box).</li>
  <li><b>MySecretPassword:</b> The password required for clients to connect.</li>
  <li><b>teamserver:</b> Must be run as root or with appropriate permissions.</li>
</ul>

<h4>Connecting with the Client</h4>
<p>Start the Cobalt Strike client (Java GUI) and connect to the team server:</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>java -jar cobaltstrike.jar</span>

[+] Cobalt Strike client started
[+] Connect to team server at 192.168.1.100:50050
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>cobaltstrike.jar:</b> The Java client application.</li>
  <li><b>Connect:</b> Enter the team server IP and password when prompted.</li>
</ul>

<h4>Launching a Beacon (Payload)</h4>
<p>Beacons are Cobalt Strike's payloads for command and control. Generate and deliver a beacon to a target system (e.g., via phishing, exploit, or manual execution).</p>
<pre class='terminal-screenshot'><pre>[Cobalt Strike GUI] <span class='term-cmd'>Attacks &rarr; Packages &rarr; Windows EXE (S)</span>

[+] Beacon payload generated: beacon.exe
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Attacks &rarr; Packages:</b> In the GUI, select the type of payload to generate (e.g., Windows EXE, PowerShell, Macro, etc.).</li>
  <li><b>beacon.exe:</b> The generated payload to deliver to the target.</li>
</ul>

<h4>Managing Beacons</h4>
<p>Once a beacon is executed on a target, it will appear in the Cobalt Strike GUI. You can interact with it for post-exploitation tasks.</p>
<pre class='terminal-screenshot'><pre>[Cobalt Strike GUI] <span class='term-cmd'>View &rarr; Beacons</span>

[+] New beacon: 192.168.1.101 (Windows 10)
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>View &rarr; Beacons:</b> Shows all active beacons (compromised hosts).</li>
  <li><b>Interact:</b> Double-click a beacon to open a command shell or run post-exploitation modules.</li>
</ul>

<h4>Running Post-Exploitation Commands</h4>
<p>Interact with a beacon to run commands, gather credentials, or move laterally.</p>
<pre class='terminal-screenshot'><pre>[Beacon 192.168.1.101] <span class='term-cmd'>shell whoami</span>

nt authority\system
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>shell:</b> Runs a command on the compromised system.</li>
  <li><b>whoami:</b> Shows the current user context (e.g., SYSTEM for full privileges).</li>
</ul>

<h4>Pivoting and Lateral Movement</h4>
<p>Use beacons to pivot to other systems in the network.</p>
<pre class='terminal-screenshot'><pre>[Beacon 192.168.1.101] <span class='term-cmd'>jump psexec 192.168.1.102</span>

[+] Pivoted to 192.168.1.102 (new beacon)
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>jump psexec:</b> Uses the PsExec technique to move laterally to another host.</li>
  <li><b>192.168.1.102:</b> The target host for lateral movement.</li>
</ul>

<h4>Reporting and Collaboration</h4>
<p>Cobalt Strike supports team collaboration and reporting.</p>
<pre class='terminal-screenshot'><pre>[Cobalt Strike GUI] <span class='term-cmd'>Reporting &rarr; Activity Report</span>

[+] Report generated: activity_report.html
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Reporting:</b> Use the Reporting menu to generate HTML or PDF reports of all activity.</li>
  <li><b>Collaboration:</b> Multiple operators can connect to the same team server and work together in real time.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>teamserver &lt;ip&gt; &lt;password&gt;:</b> Start the backend server for operator connections.</li>
  <li><b>java -jar cobaltstrike.jar:</b> Start the client GUI.</li>
  <li><b>Attacks &rarr; Packages:</b> Generate payloads for different platforms and delivery methods.</li>
  <li><b>View &rarr; Beacons:</b> Manage active sessions.</li>
  <li><b>shell &lt;command&gt;:</b> Run commands on compromised hosts.</li>
  <li><b>jump psexec &lt;target&gt;:</b> Lateral movement to other systems.</li>
  <li><b>Reporting:</b> Generate and export activity reports.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always use Cobalt Strike in authorized, legal engagements.</li>
  <li>Rotate team server passwords and restrict access to trusted operators.</li>
  <li>Use encrypted channels and OPSEC-safe payloads to avoid detection.</li>
  <li>Document all actions for reporting and debriefing.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.cobaltstrike.com/' target='_blank'>Cobalt Strike Official Website</a></li>
  <li><a href='https://www.cobaltstrike.com/help-index.html' target='_blank'>Cobalt Strike Documentation</a></li>
  <li><a href='https://github.com/rsmudge/Malleable-C2-Profiles' target='_blank'>Malleable C2 Profiles (GitHub)</a></li>
  <li><a href='https://www.youtube.com/watch?v=QkJvQ2U5r6A' target='_blank'>Cobalt Strike Demo Video</a></li>
</ul>
`,
            commands: {
                "cs connect teamserver 192.168.1.100": "Connecting to teamserver at 192.168.1.100...\n[+] Connected as operator",
                "cs launch beacon 192.168.1.101": "Launching beacon to 192.168.1.101...\n[+] Beacon launched and active"
            },
            description: 'Threat emulation and post-exploitation.'
        },
        empire: {
            name: 'Empire',
            guide: `
<h3>Empire</h3>

<h4>What is Empire?</h4>
<p><b>Empire</b> is a post-exploitation and adversary emulation framework that uses PowerShell and Python agents. It is designed for red teaming, penetration testing, and simulating advanced persistent threats (APTs). Empire allows operators to generate agents, establish command and control (C2) channels, and execute post-exploitation modules on compromised systems.</p>
<p><b>Warning:</b> Empire is a dual-use tool. Only use it in authorized, legal engagements.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux (Kali/Parrot):</b> <code>sudo apt install powershell-empire</code> or clone from <a href='https://github.com/BC-SECURITY/Empire' target='_blank'>Empire GitHub</a></li>
  <li><b>Windows/Mac:</b> Use a Linux VM or Docker image (see official docs)</li>
</ul>
<p>After installation, run <code>./empire</code> to start the Empire console.</p>

<h4>Starting the Empire Console</h4>
<p>Launch the Empire console to begin your engagement.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>./empire</span>

(Empire) >
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>./empire:</b> Starts the Empire interactive shell.</li>
  <li><b>(Empire) ></b> The prompt indicates you are in the Empire console, ready to configure listeners, agents, and modules.</li>
</ul>

<h4>Setting Up a Listener (C2 Channel)</h4>
<p>Listeners are C2 channels that receive connections from agents. Set up an HTTP listener:</p>
<pre class='terminal-screenshot'><pre>(Empire) > <span class='term-cmd'>listeners</span>

[+] http listener started on 0.0.0.0:8080
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>listeners:</b> Lists all active listeners and allows you to create new ones.</li>
  <li><b>http listener:</b> A common C2 channel using HTTP(S) for agent communication.</li>
  <li><b>0.0.0.0:8080:</b> The listener is bound to all interfaces on port 8080.</li>
</ul>

<h4>Generating and Deploying Agents</h4>
<p>Agents are payloads that, when executed on a target, connect back to your listener. Generate an agent and deploy it (e.g., via phishing, exploit, or manual execution).</p>
<pre class='terminal-screenshot'><pre>(Empire) > <span class='term-cmd'>uselistener http</span>
(Empire) > <span class='term-cmd'>launcher</span>

[+] PowerShell launcher generated. Copy and execute on the target.
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>uselistener http:</b> Selects the HTTP listener for payload generation.</li>
  <li><b>launcher:</b> Generates a PowerShell one-liner to deploy the agent.</li>
  <li><b>Copy and execute:</b> The generated command must be run on the target system to establish a session.</li>
</ul>

<h4>Managing Agents</h4>
<p>Once an agent connects, manage it from the Empire console.</p>
<pre class='terminal-screenshot'><pre>(Empire) > <span class='term-cmd'>agents</span>

[+] AGENT1 - 192.168.1.50 - Windows 10
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>agents:</b> Lists all active agents (compromised hosts).</li>
  <li><b>AGENT1:</b> The unique name assigned to the agent.</li>
  <li><b>192.168.1.50:</b> The IP address of the compromised host.</li>
</ul>

<h4>Interacting with an Agent</h4>
<p>Interact with an agent to run commands, gather credentials, or move laterally.</p>
<pre class='terminal-screenshot'><pre>(Empire) > <span class='term-cmd'>interact AGENT1</span>
(Empire:AGENT1) >
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>interact AGENT1:</b> Opens a session with the specified agent.</li>
  <li><b>(Empire:AGENT1) ></b> The prompt changes to indicate you are controlling AGENT1.</li>
</ul>

<h4>Running Post-Exploitation Modules</h4>
<p>Empire includes many modules for post-exploitation, such as credential dumping, privilege escalation, and lateral movement.</p>
<pre class='terminal-screenshot'><pre>(Empire:AGENT1) > <span class='term-cmd'>usemodule credentials/mimikatz/logonpasswords</span>

[+] Dumped credentials:
  User: Administrator
  Password: Passw0rd!
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>usemodule:</b> Loads a post-exploitation module (e.g., Mimikatz for credential dumping).</li>
  <li><b>credentials/mimikatz/logonpasswords:</b> The module path for dumping Windows logon credentials.</li>
  <li><b>Dumped credentials:</b> Shows recovered usernames and passwords from memory.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>listeners:</b> Manage C2 channels for agent communication.</li>
  <li><b>uselistener &lt;name&gt;:</b> Select a listener for payload generation.</li>
  <li><b>launcher:</b> Generate agent payloads (PowerShell, EXE, etc.).</li>
  <li><b>agents:</b> List and manage active agents.</li>
  <li><b>interact &lt;agent&gt;:</b> Control a specific agent session.</li>
  <li><b>usemodule &lt;path&gt;:</b> Load and run post-exploitation modules.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always use Empire in authorized, legal engagements.</li>
  <li>Rotate listener ports and use HTTPS for OPSEC safety.</li>
  <li>Document all actions for reporting and debriefing.</li>
  <li>Combine Empire with other tools for full kill-chain emulation.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/BC-SECURITY/Empire' target='_blank'>Empire on GitHub</a></li>
  <li><a href='https://bc-security.gitbook.io/empire-wiki/' target='_blank'>Empire Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=6pQpQwK5QnA' target='_blank'>Empire Demo Video</a></li>
</ul>
`,
            commands: {
                "empire": "(Empire) > ",
                "listeners": "(Empire) > listeners\n[+] http listener started on 0.0.0.0:8080",
                "agents": "(Empire) > agents\n[+] AGENT1 - 192.168.1.50 - Windows 10",
                "interact AGENT1": "(Empire:AGENT1) > ",
                "usemodule credentials/mimikatz/logonpasswords": "[+] Dumped credentials:\n  User: Administrator\n  Password: Passw0rd!"
            },
            description: 'Post-exploitation and adversary emulation.'
        },
        sqlmap: {
            name: 'sqlmap',
            guide: `
<h3>sqlmap</h3>

<h4>What is sqlmap?</h4>
<p><b>sqlmap</b> is an open-source penetration testing tool that automates the process of detecting and exploiting SQL injection vulnerabilities in database-driven applications. It can enumerate databases, extract data, and even gain shell access if the database is vulnerable.</p>
<p><b>Warning:</b> Only use sqlmap on systems you have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install sqlmap</code></li>
  <li><b>Other Linux/Windows/Mac:</b> Download from <a href='https://github.com/sqlmapproject/sqlmap' target='_blank'>GitHub</a> and run with Python 3.</li>
</ul>
<p>After installation, run <code>sqlmap -h</code> to see available options.</p>

<h4>Basic Usage: Testing a URL for SQL Injection</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --batch</span>

---
Parameter: cat (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: cat=1 AND 1=1
---
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-u:</b> Specifies the target URL with a parameter to test.</li>
  <li><b>--batch:</b> Runs in non-interactive mode, using default answers for prompts (useful for scripting).</li>
  <li><b>Parameter: cat:</b> sqlmap found the <code>cat</code> parameter is injectable.</li>
  <li><b>Type:</b> The type of SQL injection detected (e.g., boolean-based blind).</li>
  <li><b>Payload:</b> The actual SQL payload used to test the injection.</li>
</ul>

<h4>Enumerating Databases</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --dbs --batch</span>

available databases [3]:
[*] acuart
[*] information_schema
[*] mysql
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>--dbs:</b> Enumerates all databases on the server.</li>
  <li><b>available databases:</b> sqlmap lists the databases it discovered.</li>
</ul>

<h4>Enumerating Tables in a Database</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" -D acuart --tables --batch</span>

database: acuart
[5 tables]
+---------+
| artists |
| carts   |
| ...     |
+---------+
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-D acuart:</b> Specifies the database to enumerate tables from.</li>
  <li><b>--tables:</b> Lists all tables in the specified database.</li>
</ul>

<h4>Dumping Table Data</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" -D acuart -T users --dump --batch</span>

database: acuart
table: users
+----+----------+----------+
| id | username | password |
+----+----------+----------+
| 1  | admin    | admin123 |
+----+----------+----------+
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-T users:</b> Specifies the table to dump data from.</li>
  <li><b>--dump:</b> Extracts and displays all data from the specified table.</li>
  <li><b>username/password:</b> Example of sensitive data that can be exposed by SQL injection.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>-u &lt;url&gt;:</b> Target URL with a vulnerable parameter.</li>
  <li><b>--batch:</b> Non-interactive mode (no prompts).</li>
  <li><b>--dbs:</b> List all databases.</li>
  <li><b>-D &lt;db&gt;:</b> Specify a database.</li>
  <li><b>--tables:</b> List tables in a database.</li>
  <li><b>-T &lt;table&gt;:</b> Specify a table.</li>
  <li><b>--dump:</b> Dump all data from a table.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always have written permission before testing any system.</li>
  <li>Use <code>--risk</code> and <code>--level</code> options to control the intensity of tests (higher values may be noisy and risky).</li>
  <li>Review extracted data responsibly and report vulnerabilities to the owner.</li>
  <li>Combine sqlmap with manual analysis for best results.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://sqlmap.org/' target='_blank'>sqlmap Official Site</a></li>
  <li><a href='https://github.com/sqlmapproject/sqlmap' target='_blank'>sqlmap on GitHub</a></li>
  <li><a href='https://www.youtube.com/watch?v=Z8lLkK2r2hA' target='_blank'>sqlmap Demo Video</a></li>
</ul>
`,
            description: 'Automated SQL injection and database takeover tool.'
        },
        'burp-suite': {
            name: 'Burp Suite',
            guide: `
<h3>Burp Suite</h3>

<h4>What is Burp Suite?</h4>
<p><b>Burp Suite</b> is a popular integrated platform for performing web application security testing. It features tools for intercepting HTTP/S traffic, scanning for vulnerabilities, manipulating requests, brute-forcing, and more. Burp Suite is widely used by penetration testers and bug bounty hunters.</p>
<p><b>Warning:</b> Only use Burp Suite on systems you have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install burpsuite</code></li>
  <li><b>Windows/Mac/Linux:</b> Download from <a href='https://portswigger.net/burp' target='_blank'>portswigger.net</a> and run the installer (Java required).</li>
</ul>
<p>After installation, launch Burp Suite from your applications menu or with <code>burpsuite</code> in a terminal.</p>

<h4>Launching Burp Suite</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>burpsuite</span>

[Burp Suite splash screen appears]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>burpsuite:</b> Starts the Burp Suite graphical interface.</li>
  <li><b>Splash screen:</b> Confirms Burp Suite is launching.</li>
</ul>

<h4>Configuring Your Browser to Use Burp as a Proxy</h4>
<p>To intercept traffic, set your browser's proxy to <b>127.0.0.1:8080</b> (Burp's default). Install Burp's CA certificate to avoid HTTPS errors.</p>
<pre class='terminal-screenshot'><pre>Browser Proxy Settings:
  HTTP Proxy: 127.0.0.1
  Port: 8080
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>127.0.0.1:8080:</b> Directs browser traffic through Burp for interception and analysis.</li>
  <li><b>CA certificate:</b> Installing Burp's certificate allows interception of HTTPS traffic without browser warnings.</li>
</ul>

<h4>Intercepting and Modifying Requests</h4>
<p>With the proxy enabled, visit a website. Burp's <b>Proxy &rarr; Intercept</b> tab will show HTTP requests in real time. You can modify and forward them to the server.</p>
<pre class='terminal-screenshot'><pre>[Proxy Intercept Tab]
GET /login HTTP/1.1
Host: testsite.com
Cookie: sessionid=abc123

[Intercepted request shown in Burp]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Proxy &rarr; Intercept:</b> Shows raw HTTP requests as they are sent from your browser.</li>
  <li><b>Modify & Forward:</b> You can edit requests before sending them to the server, useful for testing input validation and security controls.</li>
</ul>

<h4>Scanning for Vulnerabilities</h4>
<p>Burp Suite Professional includes an automated scanner. Right-click a request and select <b>Scan</b> to identify common web vulnerabilities (e.g., XSS, SQLi).</p>
<pre class='terminal-screenshot'><pre>[Scanner Output]
Issue: SQL Injection
Severity: High
URL: http://testsite.com/login
Parameter: username
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Scan:</b> Initiates an automated scan of the selected request or site.</li>
  <li><b>Issue/Severity/Parameter:</b> The scanner reports the type, severity, and location of vulnerabilities found.</li>
</ul>

<h4>Repeater: Manual Request Manipulation</h4>
<p>Send requests to <b>Repeater</b> to manually modify and resend them, observing how the server responds to different inputs.</p>
<pre class='terminal-screenshot'><pre>[Repeater Tab]
Request:
POST /login HTTP/1.1
username=admin'--&password=foo

Response:
HTTP/1.1 200 OK
Welcome, admin!
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Repeater:</b> Lets you craft and resend requests, ideal for testing payloads and bypasses.</li>
  <li><b>Response:</b> Shows the server's reply, helping you identify successful attacks or information disclosure.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>Proxy:</b> Intercept and modify HTTP/S traffic.</li>
  <li><b>Scanner (Pro):</b> Automated vulnerability scanning.</li>
  <li><b>Repeater:</b> Manual request crafting and replay.</li>
  <li><b>Intruder:</b> Automated fuzzing and brute-forcing.</li>
  <li><b>Decoder:</b> Encode/decode data (Base64, URL, etc.).</li>
  <li><b>Comparer:</b> Compare requests/responses for differences.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always have written permission before testing any system.</li>
  <li>Install Burp's CA certificate to avoid HTTPS errors.</li>
  <li>Use <b>Scope</b> settings to limit testing to authorized targets.</li>
  <li>Document findings and export reports for clients or bug bounty programs.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://portswigger.net/burp' target='_blank'>Burp Suite Official Site</a></li>
  <li><a href='https://portswigger.net/web-security' target='_blank'>Web Security Academy (Free Labs)</a></li>
  <li><a href='https://www.youtube.com/watch?v=Qw1nNPkL1Kk' target='_blank'>Burp Suite Demo Video</a></li>
</ul>
`,
            description: 'Web application security testing platform.'
        },
        'owasp-zap': {
            name: 'OWASP ZAP',
            guide: `
<h3>OWASP ZAP</h3>

<h4>What is OWASP ZAP?</h4>
<p><b>OWASP ZAP</b> (Zed Attack Proxy) is a free, open-source web application security scanner. It helps find vulnerabilities in web apps during development and testing. ZAP is beginner-friendly and widely used by security professionals and developers alike.</p>
<p><b>Warning:</b> Only use ZAP on systems you have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install zaproxy</code></li>
  <li><b>Windows/Mac/Linux:</b> Download from <a href='https://www.zaproxy.org/download/' target='_blank'>zaproxy.org</a> and run the installer (Java required).</li>
</ul>
<p>After installation, launch ZAP from your applications menu or with <code>zaproxy</code> in a terminal.</p>

<h4>Launching OWASP ZAP</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>zaproxy</span>

[ZAP splash screen appears]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>zaproxy:</b> Starts the ZAP graphical interface.</li>
  <li><b>Splash screen:</b> Confirms ZAP is launching.</li>
</ul>

<h4>Configuring Your Browser to Use ZAP as a Proxy</h4>
<p>To intercept traffic, set your browser's proxy to <b>127.0.0.1:8080</b> (ZAP's default). Install ZAP's CA certificate to avoid HTTPS errors.</p>
<pre class='terminal-screenshot'><pre>Browser Proxy Settings:
  HTTP Proxy: 127.0.0.1
  Port: 8080
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>127.0.0.1:8080:</b> Directs browser traffic through ZAP for interception and analysis.</li>
  <li><b>CA certificate:</b> Installing ZAP's certificate allows interception of HTTPS traffic without browser warnings.</li>
</ul>

<h4>Spidering a Website</h4>
<p>Use the <b>Spider</b> tool to automatically crawl a website and discover all its pages and endpoints.</p>
<pre class='terminal-screenshot'><pre>[Spider Tab]
Target: http://testsite.com
Progress: 100%
Found URLs:
  /login
  /products
  /cart
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Spider:</b> Crawls the target site to map out all reachable pages and parameters.</li>
  <li><b>Found URLs:</b> Shows the discovered endpoints for further testing.</li>
</ul>

<h4>Active Scanning for Vulnerabilities</h4>
<p>After spidering, use the <b>Active Scan</b> feature to test for vulnerabilities like XSS, SQLi, and more.</p>
<pre class='terminal-screenshot'><pre>[Active Scan Tab]
Target: http://testsite.com
Issue: Cross-Site Scripting (XSS)
Severity: High
URL: http://testsite.com/search
Parameter: q
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Active Scan:</b> Sends test payloads to endpoints to identify vulnerabilities.</li>
  <li><b>Issue/Severity/Parameter:</b> Details about the vulnerability found, its risk, and where it was discovered.</li>
</ul>

<h4>Intercepting and Modifying Requests</h4>
<p>Use the <b>Manual Request Editor</b> or <b>Break</b> feature to intercept, modify, and resend HTTP requests.</p>
<pre class='terminal-screenshot'><pre>[Break Tab]
GET /login HTTP/1.1
Host: testsite.com
Cookie: sessionid=abc123

[Request paused for editing]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Break:</b> Pauses HTTP requests so you can inspect and modify them before they reach the server.</li>
  <li><b>Manual Request Editor:</b> Lets you craft custom requests for advanced testing.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>Spider:</b> Crawl the site to discover all endpoints.</li>
  <li><b>Active Scan:</b> Automated vulnerability scanning.</li>
  <li><b>Break:</b> Intercept and modify HTTP/S traffic.</li>
  <li><b>Manual Request Editor:</b> Craft and send custom requests.</li>
  <li><b>Alerts:</b> View and export vulnerability findings.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always have written permission before testing any system.</li>
  <li>Install ZAP's CA certificate to avoid HTTPS errors.</li>
  <li>Use <b>Scope</b> settings to limit testing to authorized targets.</li>
  <li>Review and validate findings before reporting.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.zaproxy.org/' target='_blank'>OWASP ZAP Official Site</a></li>
  <li><a href='https://owasp.org/www-project-zap/' target='_blank'>OWASP ZAP Project Page</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>OWASP ZAP Demo Video</a></li>
</ul>
`,
            description: 'Open-source web application security scanner.'
        },
        'aircrack-ng': {
            name: 'Aircrack-ng',
            guide: `
<h3>Aircrack-ng</h3>

<h4>What is Aircrack-ng?</h4>
<p><b>Aircrack-ng</b> is a suite of tools for auditing wireless networks. It can capture packets, crack WEP/WPA/WPA2-PSK keys, and perform attacks on Wi-Fi networks. Aircrack-ng is widely used for Wi-Fi security assessments and penetration testing.</p>
<p><b>Warning:</b> Only use Aircrack-ng on networks you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install aircrack-ng</code></li>
  <li><b>Other Linux:</b> <code>sudo apt-get install aircrack-ng</code></li>
  <li><b>Windows/Mac:</b> Download from <a href='https://www.aircrack-ng.org/downloads.html' target='_blank'>aircrack-ng.org</a></li>
</ul>
<p>After installation, you can use the suite's tools from the terminal.</p>

<h4>Step 1: Put Your Wireless Card in Monitor Mode</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>airmon-ng start wlan0</span>

Interface   Chipset         Driver
wlan0       Atheros         ath9k - [monitor mode enabled]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>airmon-ng start wlan0:</b> Enables monitor mode on the <code>wlan0</code> interface, allowing packet capture.</li>
  <li><b>monitor mode enabled:</b> Confirms the interface is ready for sniffing wireless traffic.</li>
</ul>

<h4>Step 2: Capture Handshakes or Packets</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>airodump-ng wlan0mon</span>

BSSID              PWR  Beacons    #Data, #/s  CH  MB   ENC  CIPHER AUTH ESSID
00:11:22:33:44:55  -40      100      10    0   6  54e  WPA2 CCMP   PSK  HomeWiFi
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>airodump-ng wlan0mon:</b> Scans for nearby Wi-Fi networks and displays information about them.</li>
  <li><b>BSSID:</b> The MAC address of the access point.</li>
  <li><b>ENC/CIPHER/AUTH:</b> Shows the encryption, cipher, and authentication type (e.g., WPA2-PSK).</li>
  <li><b>ESSID:</b> The network name.</li>
</ul>

<h4>Step 3: Capture the WPA Handshake</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon</span>

WPA handshake: 00:11:22:33:44:55
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-c 6:</b> Specifies the channel of the target network.</li>
  <li><b>--bssid:</b> Filters capture to a specific access point.</li>
  <li><b>-w capture:</b> Writes captured packets to a file named <code>capture.cap</code>.</li>
  <li><b>WPA handshake:</b> Indicates a handshake was captured (needed for cracking WPA/WPA2-PSK).</li>
</ul>

<h4>Step 4: Crack the WPA/WPA2 Password</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>aircrack-ng -w wordlist.txt -b 00:11:22:33:44:55 capture.cap</span>

KEY FOUND! [ password123 ]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-w wordlist.txt:</b> Specifies the wordlist to use for the dictionary attack.</li>
  <li><b>-b 00:11:22:33:44:55:</b> The BSSID of the target network.</li>
  <li><b>capture.cap:</b> The file containing the captured handshake.</li>
  <li><b>KEY FOUND!:</b> Indicates the Wi-Fi password was successfully cracked.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>airmon-ng:</b> Enable/disable monitor mode on wireless interfaces.</li>
  <li><b>airodump-ng:</b> Scan for networks and capture packets/handshakes.</li>
  <li><b>aircrack-ng:</b> Crack WEP/WPA/WPA2-PSK keys using captured data.</li>
  <li><b>-w &lt;wordlist&gt;:</b> Specify a wordlist for password cracking.</li>
  <li><b>-b &lt;BSSID&gt;:</b> Target a specific access point.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only test networks you own or have written permission to audit.</li>
  <li>Use high-quality wordlists for better cracking success.</li>
  <li>Monitor mode may disconnect you from Wi-Fi; use a dedicated adapter if possible.</li>
  <li>Respect privacy and local laws regarding wireless testing.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.aircrack-ng.org/' target='_blank'>Aircrack-ng Official Site</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKxrkht7CpY' target='_blank'>Aircrack-ng Demo Video</a></li>
  <li><a href='https://www.kali.org/tools/aircrack-ng/' target='_blank'>Kali Linux Aircrack-ng Docs</a></li>
</ul>
`,
            description: 'Wi-Fi network auditing and password cracking suite.'
        },
        wireshark: {
            name: 'Wireshark',
            guide: `
<h3>Wireshark</h3>

<h4>What is Wireshark?</h4>
<p><b>Wireshark</b> is the world's most popular network protocol analyzer. It lets you capture, inspect, and analyze network traffic in real time, making it invaluable for troubleshooting, security analysis, and learning how protocols work.</p>
<p><b>Warning:</b> Only capture traffic on networks you own or have explicit permission to analyze.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install wireshark</code></li>
  <li><b>Windows/Mac/Linux:</b> Download from <a href='https://www.wireshark.org/download.html' target='_blank'>wireshark.org</a> and run the installer.</li>
</ul>
<p>After installation, launch Wireshark from your applications menu or with <code>wireshark</code> in a terminal.</p>

<h4>Launching Wireshark</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>wireshark</span>

[Wireshark splash screen appears]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>wireshark:</b> Starts the Wireshark graphical interface.</li>
  <li><b>Splash screen:</b> Confirms Wireshark is launching.</li>
</ul>

<h4>Capturing Network Traffic</h4>
<p>Select a network interface (e.g., <code>eth0</code>, <code>wlan0</code>) and click <b>Start Capturing</b>. Wireshark will display packets in real time.</p>
<pre class='terminal-screenshot'><pre>[Wireshark Main Window]
Interface: eth0
Packets: 1200
Protocol: TCP, HTTP, DNS
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Interface:</b> The network adapter being monitored.</li>
  <li><b>Packets:</b> Number of packets captured so far.</li>
  <li><b>Protocol:</b> Types of protocols detected in the capture (e.g., TCP, HTTP, DNS).</li>
</ul>

<h4>Filtering Packets</h4>
<p>Use the filter bar to focus on specific traffic. For example, to show only HTTP packets:</p>
<pre class='terminal-screenshot'><pre>[Filter Bar]
http
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>http:</b> Shows only HTTP traffic. You can filter by any protocol or field (e.g., <code>ip.addr == 192.168.1.1</code>).</li>
</ul>

<h4>Inspecting Packet Details</h4>
<p>Click a packet to view its details, including headers, payload, and protocol breakdown.</p>
<pre class='terminal-screenshot'><pre>[Packet Details]
Frame 42: 74 bytes on wire
Ethernet II, Src: 00:11:22:33:44:55
Internet Protocol Version 4, Src: 192.168.1.10
Transmission Control Protocol, Src Port: 443
Hypertext Transfer Protocol
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Frame:</b> The raw packet as captured.</li>
  <li><b>Ethernet/IPv4/TCP/HTTP:</b> Each protocol layer is decoded and shown for analysis.</li>
  <li><b>Headers/Payload:</b> You can inspect every field and data sent over the network.</li>
</ul>

<h4>Following a TCP Stream</h4>
<p>Right-click a TCP packet and select <b>Follow &rarr; TCP Stream</b> to reconstruct conversations (e.g., HTTP requests and responses).</p>
<pre class='terminal-screenshot'><pre>[TCP Stream Window]
GET /login HTTP/1.1
Host: testsite.com
User-Agent: ...

HTTP/1.1 200 OK
Set-Cookie: sessionid=abc123
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Follow TCP Stream:</b> Reassembles all packets in a conversation for easier analysis.</li>
  <li><b>Useful for:</b> Debugging, credential discovery, and protocol analysis.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>Start/Stop Capture:</b> Begin or end packet capture on a selected interface.</li>
  <li><b>Display Filters:</b> Focus on specific traffic (protocols, IPs, ports, etc.).</li>
  <li><b>Packet Details:</b> Inspect headers, payloads, and protocol layers.</li>
  <li><b>Follow Stream:</b> Reconstruct conversations (TCP, UDP, HTTP, etc.).</li>
  <li><b>Export:</b> Save captured packets for offline analysis.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only capture traffic on networks you own or have written permission to analyze.</li>
  <li>Use filters to reduce noise and focus on relevant data.</li>
  <li>Be mindful of privacy and sensitive information in captures.</li>
  <li>Save your captures for later review or reporting.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.wireshark.org/' target='_blank'>Wireshark Official Site</a></li>
  <li><a href='https://www.wireshark.org/docs/' target='_blank'>Wireshark Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=TkCSr30UojM' target='_blank'>Wireshark Demo Video</a></li>
</ul>
`,
            description: 'Network protocol analyzer and packet capture tool.'
        },
        ettercap: {
            name: 'Ettercap',
            guide: `
<h3>Ettercap</h3>

<h4>What is Ettercap?</h4>
<p><b>Ettercap</b> is a comprehensive suite for man-in-the-middle (MITM) attacks on LAN. It supports active and passive dissection of many protocols, real-time traffic manipulation, and features for sniffing, password harvesting, and network analysis.</p>
<p><b>Warning:</b> Only use Ettercap on networks you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install ettercap-graphical</code></li>
  <li><b>Other Linux:</b> <code>sudo apt-get install ettercap-graphical</code></li>
  <li><b>Windows/Mac:</b> Download from <a href='https://www.ettercap-project.org/downloads.html' target='_blank'>ettercap-project.org</a></li>
</ul>
<p>After installation, you can use Ettercap in graphical (GUI) or text mode.</p>

<h4>Launching Ettercap (Graphical Mode)</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>ettercap -G</span>

[Ettercap GUI splash screen appears]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-G:</b> Launches Ettercap in graphical mode.</li>
  <li><b>Splash screen:</b> Confirms Ettercap is launching.</li>
</ul>

<h4>Scanning for Hosts</h4>
<p>After selecting your network interface, scan for hosts on the LAN.</p>
<pre class='terminal-screenshot'><pre>[Hosts Scan Output]
192.168.1.1
192.168.1.10
192.168.1.20
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Hosts Scan:</b> Identifies devices connected to the local network.</li>
  <li><b>IP addresses:</b> Each device found is listed by its IP address.</li>
</ul>

<h4>Performing a Man-in-the-Middle Attack (ARP Poisoning)</h4>
<p>Select two hosts (e.g., gateway and victim) and start ARP poisoning to intercept their traffic.</p>
<pre class='terminal-screenshot'><pre>[MITM Output]
ARP poisoning started: 192.168.1.1 <-> 192.168.1.20
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>ARP poisoning:</b> Ettercap sends forged ARP messages to redirect traffic through your machine.</li>
  <li><b>192.168.1.1 &lt;-&gt; 192.168.1.20:</b> Traffic between these hosts is now intercepted.</li>
</ul>

<h4>Sniffing and Capturing Passwords</h4>
<p>With MITM active, Ettercap can sniff credentials and sensitive data from intercepted traffic.</p>
<pre class='terminal-screenshot'><pre>[Sniffed Data]
User: admin
Pass: hunter2
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Sniffed Data:</b> Shows credentials or other sensitive information captured from network traffic.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>-G:</b> Launch graphical interface.</li>
  <li><b>-T:</b> Launch text interface.</li>
  <li><b>Host Scan:</b> Discover devices on the network.</li>
  <li><b>MITM (ARP Poisoning):</b> Intercept traffic between two hosts.</li>
  <li><b>Sniff:</b> Capture and analyze network data in real time.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only use Ettercap on networks you own or have written permission to test.</li>
  <li>ARP poisoning can disrupt network connectivity—use with caution.</li>
  <li>Combine Ettercap with Wireshark for deeper packet analysis.</li>
  <li>Document findings and respect privacy.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.ettercap-project.org/' target='_blank'>Ettercap Official Site</a></li>
  <li><a href='https://www.ettercap-project.org/documentation.html' target='_blank'>Ettercap Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=QwQpQwK5QnA' target='_blank'>Ettercap Demo Video</a></li>
</ul>
`,
            description: 'Man-in-the-middle attacks and network sniffing.'
        },
        responder: {
            name: 'Responder',
            guide: `
<h3>Responder</h3>

<h4>What is Responder?</h4>
<p><b>Responder</b> is a powerful tool for LLMNR, NBT-NS, and MDNS poisoning in local networks. It captures and relays authentication hashes from Windows systems, making it a staple for internal network penetration testing and credential harvesting.</p>
<p><b>Warning:</b> Only use Responder on networks you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install responder</code></li>
  <li><b>Other Linux:</b> Clone from <a href='https://github.com/lgandx/Responder' target='_blank'>GitHub</a> and run with Python 3.</li>
</ul>
<p>After installation, run Responder from the terminal.</p>

<h4>Launching Responder</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sudo responder -I eth0</span>

[+] Listening for events...
[+] Poisoners: LLMNR, NBT-NS, MDNS
[+] Servers: HTTP, SMB, MSSQL, FTP, LDAP, etc.
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-I eth0:</b> Specifies the network interface to listen on (e.g., eth0).</li>
  <li><b>Poisoners:</b> Protocols being poisoned to capture authentication requests.</li>
  <li><b>Servers:</b> Fake services set up to capture credentials.</li>
</ul>

<h4>Capturing Hashes</h4>
<p>When a Windows client tries to resolve a name, Responder poisons the request and captures the authentication hash.</p>
<pre class='terminal-screenshot'><pre>[+] [SMB] NTLMv2-SSP Client   : 192.168.1.20
    Username   : TESTLAB\alice
    Hash       : 11223344556677889900AABBCCDDEEFF:00112233445566778899AABBCCDDEEFF:0101000000000000...
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>NTLMv2-SSP:</b> The authentication protocol used.</li>
  <li><b>Client:</b> The IP address of the victim machine.</li>
  <li><b>Username/Hash:</b> The captured username and NTLMv2 hash, which can be cracked offline.</li>
</ul>

<h4>Relaying Attacks (Advanced)</h4>
<p>Responder can relay captured hashes to other services for lateral movement (with <code>--wrf</code> or <code>--lm</code> options).</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>sudo responder -I eth0 --wrf</span>

[+] SMB relay server started
[+] Waiting for connections...
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>--wrf:</b> Enables SMB relay attacks, forwarding captured hashes to other systems.</li>
  <li><b>Waiting for connections:</b> Responder is ready to relay authentication attempts.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>-I &lt;interface&gt;:</b> Specify the network interface to listen on.</li>
  <li><b>-v:</b> Verbose output for more details.</li>
  <li><b>-w:</b> Enable WPAD rogue proxy server.</li>
  <li><b>--lm:</b> Enable LM hash capture.</li>
  <li><b>--wrf:</b> Enable SMB relay attacks.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only use Responder in authorized, legal engagements.</li>
  <li>Monitor captured hashes and report findings responsibly.</li>
  <li>Combine Responder with hashcat or john for offline cracking.</li>
  <li>Disable LLMNR/NBT-NS/MDNS on networks to mitigate these attacks.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/lgandx/Responder' target='_blank'>Responder on GitHub</a></li>
  <li><a href='https://www.youtube.com/watch?v=6pQpQwK5QnA' target='_blank'>Responder Demo Video</a></li>
  <li><a href='https://www.kali.org/tools/responder/' target='_blank'>Kali Linux Responder Docs</a></li>
</ul>
`,
            description: 'LLMNR, NBT-NS, and MDNS poisoning and credential capture.'
        },
        hydra: {
            name: 'Hydra',
            guide: `
<h3>Hydra</h3>

<h4>What is Hydra?</h4>
<p><b>Hydra</b> (also known as THC-Hydra) is a fast and flexible password-cracking tool that supports numerous protocols and services. It is widely used for brute-forcing logins on SSH, FTP, HTTP, SMB, RDP, and more, making it a staple in penetration testing and red teaming.</p>
<p><b>Warning:</b> Only use Hydra on systems you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install hydra</code></li>
  <li><b>Other Linux:</b> <code>sudo apt-get install hydra</code></li>
  <li><b>Windows/Mac:</b> Download from <a href='https://github.com/vanhauser-thc/thc-hydra' target='_blank'>GitHub</a> and compile from source.</li>
</ul>
<p>After installation, run <code>hydra -h</code> to see available options.</p>

<h4>Basic Usage: Brute-Forcing SSH Login</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>hydra -l root -P passwords.txt ssh://192.168.1.10</span>

[22][ssh] host: 192.168.1.10   login: root   password: toor
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-l root:</b> Sets the username to <code>root</code>.</li>
  <li><b>-P passwords.txt:</b> Uses <code>passwords.txt</code> as the password list.</li>
  <li><b>ssh://192.168.1.10:</b> Target protocol and host.</li>
  <li><b>login/password:</b> Shows the credentials found by Hydra.</li>
</ul>

<h4>Brute-Forcing HTTP Basic Authentication</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>hydra -L users.txt -P passwords.txt http-basic://testsite.com</span>

[80][http-basic] host: testsite.com   login: admin   password: admin123
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-L users.txt:</b> Uses <code>users.txt</code> as the username list.</li>
  <li><b>-P passwords.txt:</b> Uses <code>passwords.txt</code> as the password list.</li>
  <li><b>http-basic://testsite.com:</b> Target protocol and host for HTTP Basic Auth.</li>
</ul>

<h4>Brute-Forcing FTP Login</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>hydra -l admin -P passwords.txt ftp://192.168.1.20</span>

[21][ftp] host: 192.168.1.20   login: admin   password: letmein
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>ftp://192.168.1.20:</b> Target protocol and host for FTP login.</li>
  <li><b>login/password:</b> Shows the credentials found by Hydra.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>-l &lt;user&gt;:</b> Single username.</li>
  <li><b>-L &lt;file&gt;:</b> File with list of usernames.</li>
  <li><b>-p &lt;pass&gt;:</b> Single password.</li>
  <li><b>-P &lt;file&gt;:</b> File with list of passwords.</li>
  <li><b>service://host:</b> Target protocol and host (e.g., ssh://, ftp://, http://).</li>
  <li><b>-t &lt;N&gt;:</b> Number of parallel tasks (default: 16).</li>
  <li><b>-vV:</b> Verbose output, shows each attempt.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only use Hydra in authorized, legal engagements.</li>
  <li>Use strong, relevant wordlists for best results.</li>
  <li>Monitor network impact—brute-forcing can be noisy and may trigger alerts.</li>
  <li>Respect account lockout policies to avoid DoS.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/vanhauser-thc/thc-hydra' target='_blank'>Hydra on GitHub</a></li>
  <li><a href='https://www.kali.org/tools/hydra/' target='_blank'>Kali Linux Hydra Docs</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>Hydra Demo Video</a></li>
</ul>
`,
            description: 'Fast network login cracker supporting many protocols.'
        },
        hashcat: {
            name: 'Hashcat',
            guide: `
<h3>Hashcat</h3>

<h4>What is Hashcat?</h4>
<p><b>Hashcat</b> is a powerful and fast password recovery tool that supports GPU acceleration. It can crack a wide variety of hash types (MD5, SHA1, NTLM, WPA, etc.) using dictionary, brute-force, and rule-based attacks. Hashcat is widely used for password auditing and recovery.</p>
<p><b>Warning:</b> Only use Hashcat on hashes you have explicit permission to crack.</p>

<h4>Installation</h4>
<ul>
  <li><b>Kali/Parrot:</b> <code>sudo apt install hashcat</code></li>
  <li><b>Other Linux/Windows/Mac:</b> Download from <a href='https://hashcat.net/hashcat/' target='_blank'>hashcat.net</a> and extract the archive.</li>
</ul>
<p>After installation, run <code>hashcat -h</code> to see available options.</p>

<h4>Basic Usage: Cracking an MD5 Hash</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>hashcat -m 0 -a 0 -o found.txt hashes.txt wordlist.txt</span>

hashcat (v6.2.5) starting...
...
Session..........: hashcat
Hash.Name........: MD5
Hash.Target......: hashes.txt
...
[...]
Session completed.
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-m 0:</b> Hash type 0 (MD5). Use <code>hashcat --help</code> for other hash types.</li>
  <li><b>-a 0:</b> Attack mode 0 (straight/dictionary attack).</li>
  <li><b>-o found.txt:</b> Output file for cracked passwords.</li>
  <li><b>hashes.txt:</b> File containing hashes to crack.</li>
  <li><b>wordlist.txt:</b> Wordlist to use for the attack.</li>
</ul>

<h4>Viewing Cracked Passwords</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>cat found.txt</span>

5f4dcc3b5aa765d61d8327deb882cf99:password
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>cat found.txt:</b> Shows the hash and its corresponding cracked password.</li>
</ul>

<h4>Cracking a WPA/WPA2 Handshake</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>hashcat -m 22000 -a 0 -o wifi.txt capture.hc22000 wordlist.txt</span>

Session..........: hashcat
Hash.Name........: WPA-PBKDF2-PMKID+EAPOL
Hash.Target......: capture.hc22000
...
Session completed.
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-m 22000:</b> Hash type for WPA/WPA2 (PMKID+EAPOL format).</li>
  <li><b>capture.hc22000:</b> WPA handshake file (convert .cap to .hc22000 with <code>hcxpcapngtool</code>).</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>-m &lt;type&gt;:</b> Hash type (see <code>hashcat --help</code> for all types).</li>
  <li><b>-a &lt;mode&gt;:</b> Attack mode (0: dictionary, 3: brute-force, 6: hybrid, etc.).</li>
  <li><b>-o &lt;file&gt;:</b> Output file for cracked passwords.</li>
  <li><b>--show:</b> Display cracked passwords for a hash file.</li>
  <li><b>--status:</b> Show status during cracking.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Only crack hashes you have permission to audit.</li>
  <li>Use a GPU for much faster cracking speeds.</li>
  <li>Choose the correct hash mode for your target hashes.</li>
  <li>Use high-quality wordlists and rules for best results.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://hashcat.net/hashcat/' target='_blank'>Hashcat Official Site</a></li>
  <li><a href='https://hashcat.net/wiki/' target='_blank'>Hashcat Wiki</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>Hashcat Demo Video</a></li>
</ul>
`,
            description: 'Advanced GPU-accelerated password hash cracker.'
        },
        mimikatz: {
            name: 'Mimikatz',
            guide: `
<h3>Mimikatz</h3>

<h4>What is Mimikatz?</h4>
<p><b>Mimikatz</b> is a powerful post-exploitation tool for extracting plaintext passwords, hashes, PINs, and Kerberos tickets from memory on Windows systems. It is widely used for credential dumping, pass-the-hash, and Kerberos attacks during red team and penetration testing engagements.</p>
<p><b>Warning:</b> Only use Mimikatz on systems you own or have explicit permission to test. Running Mimikatz will trigger most antivirus and EDR solutions.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows:</b> Download from <a href='https://github.com/gentilkiwi/mimikatz/releases' target='_blank'>GitHub Releases</a> and extract the archive.</li>
  <li><b>Linux/Mac:</b> Use via <code>wine</code> or run on a Windows VM.</li>
</ul>
<p>After extraction, run <code>mimikatz.exe</code> as Administrator.</p>

<h4>Launching Mimikatz</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>C:\Users\redteam&gt;</span> <span class='term-cmd'>mimikatz.exe</span>

mimikatz #
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>mimikatz.exe:</b> Starts the Mimikatz interactive shell.</li>
  <li><b>mimikatz #:</b> The prompt for entering commands.</li>
</ul>

<h4>Dumping Cleartext Passwords</h4>
<pre class='terminal-screenshot'><pre>mimikatz # <span class='term-cmd'>privilege::debug</span>
Privilege '20' OK
mimikatz # <span class='term-cmd'>sekurlsa::logonpasswords</span>

Username : Administrator
Domain   : TESTLAB
Password : Passw0rd!
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>privilege::debug:</b> Enables debug privileges (required for most actions).</li>
  <li><b>sekurlsa::logonpasswords:</b> Dumps credentials from memory, including plaintext passwords, hashes, and Kerberos tickets.</li>
  <li><b>Username/Password:</b> Example of credentials recovered from memory.</li>
</ul>

<h4>Dumping NTLM Hashes</h4>
<pre class='terminal-screenshot'><pre>mimikatz # <span class='term-cmd'>lsadump::sam</span>

RID  : 500
User : Administrator
LM   : aad3b435b51404eeaad3b435b51404ee
NTLM : 31d6cfe0d16ae931b73c59d7e0c089c0
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>lsadump::sam:</b> Dumps password hashes from the SAM database.</li>
  <li><b>NTLM:</b> The NTLM hash can be used for pass-the-hash attacks.</li>
</ul>

<h4>Pass-the-Hash Attack</h4>
<pre class='terminal-screenshot'><pre>mimikatz # <span class='term-cmd'>sekurlsa::pth /user:Administrator /domain:TESTLAB /ntlm:31d6cfe0d16ae931b73c59d7e0c089c0 /run:cmd.exe</span>

user : Administrator
NTLM : 31d6cfe0d16ae931b73c59d7e0c089c0
Impersonation : OK
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>sekurlsa::pth:</b> Performs a pass-the-hash attack, launching a new process as the specified user using the NTLM hash.</li>
  <li><b>/user, /domain, /ntlm, /run:</b> Specify the user, domain, hash, and process to run.</li>
  <li><b>Impersonation : OK:</b> Indicates the attack was successful.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>privilege::debug:</b> Enable debug privileges.</li>
  <li><b>sekurlsa::logonpasswords:</b> Dump credentials from memory.</li>
  <li><b>lsadump::sam:</b> Dump password hashes from the SAM database.</li>
  <li><b>sekurlsa::pth:</b> Pass-the-hash attack.</li>
  <li><b>kerberos::list:</b> List Kerberos tickets.</li>
  <li><b>sekurlsa::tickets:</b> Dump Kerberos tickets from memory.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Run Mimikatz as Administrator for full access.</li>
  <li>Expect antivirus/EDR to block or alert on Mimikatz—use in isolated labs or with proper exclusions.</li>
  <li>Document all actions and findings for reporting.</li>
  <li>Never use Mimikatz on unauthorized systems.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/gentilkiwi/mimikatz' target='_blank'>Mimikatz on GitHub</a></li>
  <li><a href='https://github.com/gentilkiwi/mimikatz/wiki' target='_blank'>Mimikatz Wiki</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>Mimikatz Demo Video</a></li>
</ul>
`,
            description: 'Credential dumping and pass-the-hash attacks on Windows.'
        },
        bloodhound: {
            name: 'BloodHound',
            guide: `
<h3>BloodHound</h3>

<h4>What is BloodHound?</h4>
<p><b>BloodHound</b> is a tool for analyzing Active Directory (AD) trust relationships and privilege escalation paths. It helps red teamers and defenders visualize and understand attack paths in Windows domain environments, making it easier to identify privilege escalation and lateral movement opportunities.</p>
<p><b>Warning:</b> Only use BloodHound and its data collection tools on networks you own or have explicit permission to test.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows/Linux/Mac:</b> Download the latest release from <a href='https://github.com/BloodHoundAD/BloodHound/releases' target='_blank'>GitHub</a>.</li>
  <li>Extract the archive and run <code>BloodHound.exe</code> (Windows) or <code>BloodHound</code> (Linux/Mac, may require <code>chmod +x</code>).</li>
  <li>Requires <a href='https://neo4j.com/download/' target='_blank'>Neo4j</a> (graph database) to be running in the background.</li>
</ul>
<p>After installation, start Neo4j, then launch BloodHound.</p>

<h4>Launching BloodHound</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>C:\Users\redteam&gt;</span> <span class='term-cmd'>BloodHound.exe</span>

[BloodHound GUI splash screen appears]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>BloodHound.exe:</b> Starts the BloodHound graphical interface.</li>
  <li><b>Splash screen:</b> Confirms BloodHound is launching.</li>
</ul>

<h4>Collecting Data with SharpHound</h4>
<p>Use the <b>SharpHound</b> ingestor to collect data from Active Directory. Run it on a domain-joined system with appropriate permissions.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>C:\Users\redteam&gt;</span> <span class='term-cmd'>SharpHound.exe -c All</span>

[+] Collected 10,000 objects from AD
[+] Output: 20240601_123456_BloodHound.zip
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>SharpHound.exe:</b> The data collection tool for BloodHound.</li>
  <li><b>-c All:</b> Collects all available data (sessions, ACLs, group memberships, trusts, etc.).</li>
  <li><b>Output:</b> The results are saved as a .zip file for import into BloodHound.</li>
</ul>

<h4>Importing Data into BloodHound</h4>
<p>Drag and drop the <code>.zip</code> file(s) generated by SharpHound into the BloodHound GUI to populate the database.</p>
<pre class='terminal-screenshot'><pre>[BloodHound GUI]
Drag and drop: 20240601_123456_BloodHound.zip
[+] Data imported successfully
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Drag and drop:</b> Importing the data populates the graph database with AD objects and relationships.</li>
  <li><b>Data imported:</b> You can now query and visualize attack paths.</li>
</ul>

<h4>Finding Attack Paths</h4>
<p>Use the search bar or built-in queries to find shortest paths to high-value targets (e.g., Domain Admins).</p>
<pre class='terminal-screenshot'><pre>[BloodHound GUI]
Query: Shortest paths from user1 to Domain Admins
[Graph] Found shortest path from user1 to Domain Admins
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Query:</b> BloodHound can automatically find and visualize attack paths between users, groups, and computers.</li>
  <li><b>Graph:</b> The graph view shows each step an attacker could take to escalate privileges.</li>
</ul>

<h4>Exporting and Reporting</h4>
<p>Export graphs and findings for reporting or further analysis.</p>
<pre class='terminal-screenshot'><pre>[BloodHound GUI]
Export: PDF
[+] Graph exported to report.pdf
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Export:</b> Save the current graph as a PDF or image for documentation or sharing with your team.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>SharpHound.exe -c All:</b> Collect all data from AD.</li>
  <li><b>SharpHound.exe -c Session,ACL:</b> Collect only session and ACL data (faster, less noisy).</li>
  <li><b>BloodHound GUI:</b> Import data, run queries, and visualize attack paths.</li>
  <li><b>Export:</b> Save graphs and findings for reporting.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always have written permission before collecting data from AD environments.</li>
  <li>Run SharpHound from a domain-joined system for best results.</li>
  <li>Use targeted collection options to reduce noise and avoid detection.</li>
  <li>Review and validate findings before reporting or acting on them.</li>
  <li>Combine BloodHound with other tools for a complete AD assessment.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/BloodHoundAD/BloodHound' target='_blank'>BloodHound on GitHub</a></li>
  <li><a href='https://bloodhound.readthedocs.io/en/latest/' target='_blank'>BloodHound Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>BloodHound Demo Video</a></li>
</ul>
`,
            description: 'Active Directory attack path analysis.'
        },
        powersploit: {
            name: 'PowerSploit',
            guide: `
<h3>PowerSploit</h3>

<h4>What is PowerSploit?</h4>
<p><b>PowerSploit</b> is a collection of Microsoft PowerShell modules for post-exploitation, offensive security, and red teaming. It automates tasks like code execution, credential harvesting, persistence, and more on Windows systems.</p>
<p><b>Warning:</b> Only use PowerSploit on systems you own or have explicit permission to test. Many modules are highly invasive and will trigger antivirus/EDR.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows:</b> Download from <a href='https://github.com/PowerShellMafia/PowerSploit' target='_blank'>GitHub</a> and extract the archive.</li>
  <li>Import modules in PowerShell with <code>Import-Module .\PowerSploit\Recon\PowerView.ps1</code> (or other module paths).</li>
</ul>
<p>Bypass PowerShell execution policy if needed: <code>powershell -ep bypass</code></p>

<h4>Running PowerSploit Modules</h4>
<p>Import a module and run a function, e.g., <b>Invoke-Mimikatz</b> for credential dumping.</p>
<pre class='terminal-screenshot'><pre><span class='term-path'>PS C:\Users\redteam&gt;</span> <span class='term-cmd'>powershell -ep bypass -File Invoke-Mimikatz.ps1</span>

[+] Credentials dumped: Administrator / Passw0rd!
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-ep bypass:</b> Bypasses PowerShell script execution restrictions.</li>
  <li><b>-File Invoke-Mimikatz.ps1:</b> Runs the Mimikatz module to dump credentials.</li>
  <li><b>Credentials dumped:</b> Example output showing recovered credentials.</li>
</ul>

<h4>Extracting Group Policy Preferences Passwords</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>PS C:\Users\redteam&gt;</span> <span class='term-cmd'>powershell -ep bypass -File Get-GPPPassword.ps1</span>

[+] Found password: GPPPassword123
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Get-GPPPassword.ps1:</b> Extracts plaintext passwords from Group Policy Preferences (if present).</li>
  <li><b>Found password:</b> Example of a discovered password.</li>
</ul>

<h4>Reconnaissance with PowerView</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>PS C:\Users\redteam&gt;</span> <span class='term-cmd'>Import-Module .\PowerSploit\Recon\PowerView.ps1</span>
<span class='term-path'>PS C:\Users\redteam&gt;</span> <span class='term-cmd'>Get-NetUser</span>

Name     : Administrator
Name     : alice
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Import-Module:</b> Loads the PowerView module for AD recon.</li>
  <li><b>Get-NetUser:</b> Lists user accounts in the domain.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>powershell -ep bypass:</b> Bypass script execution policy.</li>
  <li><b>Import-Module &lt;path&gt;:</b> Load a PowerSploit module.</li>
  <li><b>Invoke-Mimikatz:</b> Dump credentials from memory.</li>
  <li><b>Get-GPPPassword:</b> Extract Group Policy Preferences passwords.</li>
  <li><b>PowerView:</b> Reconnaissance and AD enumeration.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Run PowerSploit in an elevated (Administrator) PowerShell session.</li>
  <li>Expect antivirus/EDR to block or alert on many modules—test in isolated labs or with proper exclusions.</li>
  <li>Document all actions and findings for reporting.</li>
  <li>Never use PowerSploit on unauthorized systems.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://github.com/PowerShellMafia/PowerSploit' target='_blank'>PowerSploit on GitHub</a></li>
  <li><a href='https://powersploit.readthedocs.io/en/latest/' target='_blank'>PowerSploit Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>PowerSploit Demo Video</a></li>
</ul>
`,
            description: 'PowerShell post-exploitation modules.'
        },
        gophish: {
            name: 'Gophish',
            guide: `
<h3>Gophish</h3>

<h4>What is Gophish?</h4>
<p><b>Gophish</b> is an open-source phishing framework for running real-world phishing campaigns. It provides a web interface to create, launch, and track phishing campaigns, automating email delivery, landing page hosting, and results tracking. Gophish is widely used for security awareness training and red team operations.</p>
<p><b>Warning:</b> Only use Gophish for authorized security testing and awareness training. Phishing without consent is illegal and unethical.</p>

<h4>Installation</h4>
<ul>
  <li><b>Windows/Linux/Mac:</b> Download the latest release from <a href='https://github.com/gophish/gophish/releases' target='_blank'>GitHub</a> and extract the archive.</li>
  <li>Run the binary: <code>./gophish</code> (Linux/Mac) or <code>gophish.exe</code> (Windows).</li>
</ul>
<p>After starting, access the web UI at <code>http://127.0.0.1:3333</code> (default admin password: <code>gophish</code>).</p>

<h4>Launching Gophish</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@kali:~$</span> <span class='term-cmd'>./gophish</span>

Gophish server started at http://127.0.0.1:3333
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>./gophish:</b> Starts the Gophish server and web UI.</li>
  <li><b>http://127.0.0.1:3333:</b> The default address for the admin interface.</li>
</ul>

<h4>Logging in to the Web UI</h4>
<pre class='terminal-screenshot'><pre>[Web Browser]
URL: http://127.0.0.1:3333
Username: admin
Password: gophish
[Login Button]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>URL:</b> The address of the Gophish admin interface.</li>
  <li><b>Default credentials:</b> Username is <code>admin</code>, password is <code>gophish</code> (change after first login).</li>
</ul>

<h4>Creating a New Phishing Campaign</h4>
<pre class='terminal-screenshot'><pre>[Gophish Web UI]
Campaigns &rarr; New Campaign
Name: Q2 Security Awareness
Launch Date: 2024-06-01
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Campaigns &rarr; New Campaign:</b> Start a new phishing campaign from the dashboard.</li>
  <li><b>Name/Launch Date:</b> Set campaign details for tracking and reporting.</li>
</ul>

<h4>Configuring Email Templates and Landing Pages</h4>
<pre class='terminal-screenshot'><pre>[Gophish Web UI]
Email Templates &rarr; New Template
Subject: Important Security Update
Body: Please click the link below to update your password.
Landing Pages &rarr; New Page
URL: http://phish.example.com/login
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Email Templates:</b> Design the phishing email to be sent to targets.</li>
  <li><b>Landing Pages:</b> Create the web page users see if they click the phishing link.</li>
  <li><b>URL:</b> The address of the fake login page (can be customized).</li>
</ul>

<h4>Adding Recipients</h4>
<pre class='terminal-screenshot'><pre>[Gophish Web UI]
Users & Groups &rarr; New Group
Group Name: Employees
Add Recipients: alice@example.com, bob@example.com
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Users & Groups:</b> Organize targets into groups for each campaign.</li>
  <li><b>Add Recipients:</b> List of email addresses to receive the phishing email.</li>
</ul>

<h4>Launching and Monitoring the Campaign</h4>
<pre class='terminal-screenshot'><pre>[Gophish Web UI]
[+] Campaign created: "Q2 Security Awareness"
[+] Emails sent: 50
[+] Emails opened: 30
[+] Links clicked: 10
[+] Credentials submitted: 2
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Campaign created:</b> Confirmation that the campaign is live.</li>
  <li><b>Emails sent/opened/clicked/credentials submitted:</b> Real-time statistics for tracking user engagement and awareness.</li>
</ul>

<h4>Exporting Results</h4>
<pre class='terminal-screenshot'><pre>[Gophish Web UI]
Export: CSV
[+] Results exported to results.csv
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Export:</b> Download campaign data for documentation or sharing with stakeholders.</li>
</ul>

<h4>Common Options & Actions</h4>
<ul>
  <li><b>./gophish:</b> Start the server and web UI.</li>
  <li><b>Campaigns:</b> Create and manage phishing campaigns.</li>
  <li><b>Email Templates:</b> Design and reuse phishing emails.</li>
  <li><b>Landing Pages:</b> Create custom web pages for campaigns.</li>
  <li><b>Users & Groups:</b> Organize and manage recipients.</li>
  <li><b>Export:</b> Download results for reporting.</li>
</ul>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Always have written authorization before running phishing campaigns.</li>
  <li>Customize templates and landing pages to match your organization for realistic testing.</li>
  <li>Educate users after campaigns to improve security awareness.</li>
  <li>Review results and report findings responsibly.</li>
  <li>Change the default admin password after first login.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://getgophish.com/' target='_blank'>Gophish Official Site</a></li>
  <li><a href='https://github.com/gophish/gophish' target='_blank'>Gophish on GitHub</a></li>
  <li><a href='https://docs.getgophish.com/' target='_blank'>Gophish Documentation</a></li>
  <li><a href='https://www.youtube.com/watch?v=QKXv8QGvF6A' target='_blank'>Gophish Demo Video</a></li>
</ul>
`,
            description: 'Phishing campaign automation and tracking.'
        }
    };
    // --- END FLAT TOOL LIST ---

    // Organize tools by category (best tools only)
    const redCategories = [
        {
            name: 'Reconnaissance & Enumeration',
            tools: {
                nmap: allTools.nmap,
                'recon-ng': allTools['recon-ng'],
                theharvester: allTools.theharvester,
                shodan: allTools.shodan,
                spiderfoot: allTools.spiderfoot,
                maltego: allTools.maltego,
                foca: allTools.foca
            }
        },
        {
            name: 'Vulnerability Scanning & Exploitation',
            tools: {
                nessus: allTools.nessus,
                openvas: allTools.openvas,
                metasploit: allTools.metasploit,
                'cobalt-strike': allTools['cobalt-strike'],
                empire: allTools.empire,
                sqlmap: allTools.sqlmap,
                'burp-suite': allTools['burp-suite'],
                'owasp-zap': allTools['owasp-zap']
            }
        },
        {
            name: 'Network & Wireless Attacks',
            tools: {
                'aircrack-ng': allTools['aircrack-ng'],
                wireshark: allTools.wireshark,
                ettercap: allTools.ettercap,
                responder: allTools.responder,
                hydra: allTools.hydra
            }
        },
        {
            name: 'Password Attacks',
            tools: {
                john: allTools.john,
                hashcat: allTools.hashcat,
                hydra: allTools.hydra
            }
        },
        {
            name: 'Post-Exploitation & Privilege Escalation',
            tools: {
                mimikatz: allTools.mimikatz,
                bloodhound: allTools.bloodhound,
                powersploit: allTools.powersploit,
                empire: allTools.empire
            }
        },
        {
            name: 'Social Engineering & Phishing',
            tools: {
                gophish: allTools.gophish
            }
        }
    ];

    // UI rendering
    const toolList = document.getElementById('tool-list');
    const toolSearch = document.getElementById('tool-search');
    const toolGuide = document.getElementById('main-tool-guide');
    const terminal = document.getElementById('main-terminal');
    const hiddenInput = document.getElementById('main-hidden-input');
    let currentToolKey = null;
    let currentCategory = null;
    let commandHistory = [];
    let historyIndex = 0;

    function renderToolList(filter = "") {
        toolList.innerHTML = "";
        redCategories.forEach(cat => {
            // Filter tools in this category
            const filtered = Object.entries(cat.tools).filter(([key, tool]) => {
                return tool && (
                    tool.name.toLowerCase().includes(filter) ||
                    (tool.description && tool.description.toLowerCase().includes(filter))
                );
            });
            if (filtered.length > 0) {
                // Category header
                const header = document.createElement('li');
                header.textContent = cat.name;
                header.className = 'tool-category-header';
                header.style.cssText = 'font-weight:bold;margin-top:18px;margin-bottom:6px;color:#ff1744;font-size:1.08em;background:none;cursor:default;';
                toolList.appendChild(header);
                // Tools
                filtered.forEach(([key, tool]) => {
                    const li = document.createElement('li');
                    li.textContent = tool.name;
                    li.dataset.tool = key;
                    if (key === currentToolKey) li.classList.add('selected');
                    li.onclick = () => selectTool(key, cat);
                    toolList.appendChild(li);
                });
            }
        });
    }

    function selectTool(toolKey, catOverride) {
        currentToolKey = toolKey;
        // Find the category for this tool
        let foundCat = catOverride;
        if (!foundCat) {
            for (const cat of redCategories) {
                if (Object.keys(cat.tools).includes(toolKey)) {
                    foundCat = cat;
                    break;
                }
            }
        }
        currentCategory = foundCat;
        renderToolList(toolSearch.value.toLowerCase());
        // Show the activity above the guide
        toolGuide.innerHTML = (currentCategory && currentCategory.activity ? `<div class='category-activity'>${currentCategory.activity}</div>` : "") + allTools[toolKey].guide;
        // Only nmap can show the terminal and input, all others always hide them
        if (toolKey === 'nmap') {
            terminal.style.display = 'none';
            hiddenInput.style.display = 'none';
        } else {
            terminal.style.display = 'none';
            hiddenInput.style.display = 'none';
        }
    }

    function createNewInputLine() {
        const line = document.createElement('div');
        line.className = 'input-line';
        line.innerHTML = `<span class=\"prompt\">${currentToolKey}&gt;</span><span class=\"input-text\"></span><span class=\"cursor\"></span>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function runCommand(cmd) {
        const toolData = allTools[currentToolKey];
        const currentLine = terminal.querySelector('.input-line');
        if(currentLine) {
            currentLine.querySelector('.cursor').remove();
            const oldInput = currentLine.querySelector('.input-text').innerText;
            currentLine.innerHTML = `<span class=\"prompt\">${currentToolKey}&gt;</span>${oldInput}`;
            currentLine.classList.remove('input-line');
        }
        if (cmd) {
            const outputText = (toolData.commands && toolData.commands[cmd]) || `command not found: ${cmd}`;
            const outputLine = document.createElement('div');
            outputLine.className = 'output';
            outputLine.innerText = outputText;
            terminal.appendChild(outputLine);
            if (cmd && !commandHistory.includes(cmd)) {
                commandHistory.push(cmd);
            }
        }
        historyIndex = commandHistory.length;
        createNewInputLine();
        hiddenInput.value = '';
    }

    terminal.addEventListener('click', () => {
        hiddenInput.focus();
    });
    hiddenInput.addEventListener('focus', () => terminal.classList.add('focused'));
    hiddenInput.addEventListener('blur', () => terminal.classList.remove('focused'));
    hiddenInput.addEventListener('input', () => {
        const inputText = terminal.querySelector('.input-line .input-text');
        if(inputText) {
            inputText.textContent = hiddenInput.value;
        }
    });
    hiddenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runCommand(hiddenInput.value.trim());
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                hiddenInput.value = commandHistory[historyIndex];
                hiddenInput.dispatchEvent(new Event('input'));
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                hiddenInput.value = commandHistory[historyIndex];
                hiddenInput.dispatchEvent(new Event('input'));
            } else {
                historyIndex = commandHistory.length;
                hiddenInput.value = '';
                hiddenInput.dispatchEvent(new Event('input'));
            }
        }
    });

    toolSearch.addEventListener('input', function() {
        renderToolList(this.value.toLowerCase());
        // If no tool is selected or filtered out, select the first visible tool
        const first = toolList.querySelector('li:not(.tool-category-header)');
        if (first && !first.classList.contains('selected')) {
            selectTool(first.dataset.tool);
        }
    });

    // Initial render
    renderToolList();
    // Select the first tool in the first category by default
    const firstCat = redCategories[0];
    selectTool(Object.keys(firstCat.tools)[0], firstCat);
}); 

// Red Team Tools JavaScript with Sound Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sound button state
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
        soundBtn.textContent = window.soundManager.enabled ? '🔊' : '🔇';
        soundBtn.style.background = window.soundManager.enabled ? '#00eaff' : '#ff1744';
    }
    
    // Add sound effects to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            window.soundManager.playClick();
            // Add visual feedback
            this.classList.add('success-feedback');
            setTimeout(() => {
                this.classList.remove('success-feedback');
            }, 500);
        });
        
        card.addEventListener('mouseenter', function() {
            window.soundManager.playHover();
        });
    });
    
    // Add sound effects to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            window.soundManager.playClick();
        });
        
        link.addEventListener('mouseenter', function() {
            window.soundManager.playHover();
        });
    });
    
    // Add sound effects to return button
    const returnBtn = document.querySelector('.return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            window.soundManager.playClick();
        });
        
        returnBtn.addEventListener('mouseenter', function() {
            window.soundManager.playHover();
        });
    }
    
    // Add sound effects to terminal interactions
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.addEventListener('click', function() {
            window.soundManager.playTerminal();
        });
    }
    
    // Add sound effects to any buttons in the content
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            window.soundManager.playClick();
        });
        
        button.addEventListener('mouseenter', function() {
            window.soundManager.playHover();
        });
    });
    
    // Add sound effects to logo
    const logo = document.querySelector('.page-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.soundManager.playSuccess();
            // Add visual feedback
            this.style.animation = 'logoGlow 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
        
        logo.addEventListener('mouseenter', function() {
            window.soundManager.playHover();
        });
    }
});

function toggleSound() {
    window.soundManager.toggle();
    const soundBtn = document.getElementById('sound-toggle');
    soundBtn.textContent = window.soundManager.enabled ? '🔊' : '🔇';
    soundBtn.style.background = window.soundManager.enabled ? '#00eaff' : '#ff1744';
    
    // Add visual feedback
    soundBtn.classList.add('success-feedback');
    setTimeout(() => {
        soundBtn.classList.remove('success-feedback');
    }, 500);
}

// Red Team Tools JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
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
});