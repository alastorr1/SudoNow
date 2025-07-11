document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Blue Team Tools with detailed descriptions and interactive commands
    const blueCategories = [
        {
            name: 'SIEM & Log Analysis',
            activity: '🔍 Monitoring and analyzing security events, logs, and alerts in real-time',
            tools: {
                splunk: {
                    name: 'Splunk',
                    guide: `
<h3>Splunk Enterprise Security</h3>

<h4>What is Splunk?</h4>
<p><b>Splunk</b> is a leading platform for searching, monitoring, and analyzing machine-generated data (logs, events, metrics) via a web interface. It is the industry standard for SIEM (Security Information and Event Management) and log analysis, used by blue teams for threat detection, incident response, and compliance.</p>
<p><b>Warning:</b> Only analyze data you are authorized to access. SIEM data is sensitive and may contain confidential information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> Download from <a href='https://www.splunk.com/en_us/download/splunk-enterprise.html' target='_blank'>Splunk Downloads</a> and follow the installation guide.</li>
  <li><b>Windows:</b> Download the installer and run as Administrator.</li>
  <li><b>Mac:</b> Download the .dmg and install as usual.</li>
</ul>
<p>After installation, start Splunk with <code>./splunk start</code> (Linux/Mac) or from the Start menu (Windows).</p>

<h4>Starting Splunk</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@siem:~$</span> <span class='term-cmd'>./splunk start</span>

Splunk> Starting Splunk...
Splunk started and running.
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>./splunk start:</b> Starts the Splunk server and web interface.</li>
  <li><b>Splunk started:</b> Confirms the service is running.</li>
</ul>

<h4>Accessing the Web Interface</h4>
<pre class='terminal-screenshot'><pre>[Web Browser]
URL: http://localhost:8000
Username: admin
Password: (set during install)
[Login Button]
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>URL:</b> The default address for the Splunk web UI.</li>
  <li><b>Credentials:</b> Use the admin account created during installation.</li>
</ul>

<h4>Searching Logs with SPL (Search Processing Language)</h4>
<pre class='terminal-screenshot'><pre>[Splunk Web UI]
Search: <span class='term-cmd'>index=main error</span>

_time                source              sourcetype         message
2024-06-01 14:23:12  web-server-01      apache:access      ERROR: Authentication failed for user admin from 10.0.0.15
2024-06-01 14:22:45  firewall-01        cisco:asa          ERROR: Connection timeout to 192.168.1.100:443
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>index=main error:</b> Searches for the keyword "error" in the main index.</li>
  <li><b>_time/source/sourcetype/message:</b> Columns in the Splunk search results.</li>
</ul>

<h4>Visualizing Data with Dashboards</h4>
<pre class='terminal-screenshot'><pre>[Splunk Web UI]
Dashboards &rarr; New Dashboard
Add Panel: Timechart of failed logins
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Dashboards:</b> Visualize search results with charts, tables, and graphs.</li>
  <li><b>Timechart:</b> Shows trends over time (e.g., failed logins per hour).</li>
</ul>

<h4>Creating Alerts</h4>
<pre class='terminal-screenshot'><pre>[Splunk Web UI]
Alerts &rarr; New Alert
Search: <span class='term-cmd'>index=main action=DENY</span>
Trigger: If results > 10 in 5 minutes
Action: Send email to soc@example.com
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Alerts:</b> Automated notifications for suspicious activity.</li>
  <li><b>Trigger:</b> Set thresholds for alerting (e.g., more than 10 denied actions in 5 minutes).</li>
  <li><b>Action:</b> Choose what happens when the alert triggers (e.g., send email, run script).</li>
</ul>

<h4>Common SPL Examples</h4>
<ul>
  <li><code>index=main error</code> — Search for errors in the main index.</li>
  <li><code>index=main source="firewall" action=DENY | stats count by src_ip</code> — Count denied connections by source IP.</li>
  <li><code>index=main | timechart count by sourcetype</code> — Time-based chart of events.</li>
  <li><code>index=main | search user="admin" | table _time, source, message</code> — Search for admin user activity.</li>
</ul>

<h4>Interpreting Results</h4>
<p>Splunk search results are shown in tables, charts, and dashboards. Each column (e.g., <code>_time</code>, <code>source</code>, <code>message</code>) provides context for the event. Use filters and visualizations to spot trends and anomalies.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use specific search terms and filters to reduce noise.</li>
  <li>Schedule regular alerts for critical events (failed logins, malware, etc.).</li>
  <li>Build dashboards for SOC monitoring and executive reporting.</li>
  <li>Regularly update Splunk and apps for new features and security patches.</li>
  <li>Restrict access to sensitive data and audit user activity.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/WelcometotheSearchTutorial' target='_blank'>Splunk Search Tutorial</a></li>
  <li><a href='https://www.splunk.com/en_us/download/splunk-enterprise.html' target='_blank'>Splunk Downloads</a></li>
  <li><a href='https://splunkbase.splunk.com/' target='_blank'>Splunkbase (Apps & Add-ons)</a></li>
  <li><a href='https://www.youtube.com/watch?v=9nK4Q2R3bJc' target='_blank'>Splunk Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `Splunk Enterprise Security - Available Commands:

SEARCH COMMANDS:
• search [SPL query] - Search logs with SPL syntax
• indexes - List available data indexes
• sources - List data sources
• sourcetypes - List sourcetypes

SYSTEM COMMANDS:
• stats - Show system statistics
• users - List active users
• alerts - Show recent alerts

SPL EXAMPLES:
• search index=main error
• search index=main source="firewall" action=DENY | stats count by src_ip
• search index=main | timechart count by sourcetype
• search index=main | search user="admin" | table _time, source, message

Type 'search' followed by your SPL query to search logs.`,
                        "search index=main error": `Searching index=main for "error"...
Results: 1,247 events found in the last 24 hours

_time                source              sourcetype         message
2024-01-15 14:23:12 web-server-01      apache:access      ERROR: Authentication failed for user admin from 10.0.0.15
2024-01-15 14:22:45 firewall-01        cisco:asa          ERROR: Connection timeout to 192.168.1.100:443
2024-01-15 14:21:33 database-01        mysql:error        ERROR: Failed login attempt from 10.0.0.15 (Access denied)
2024-01-15 14:20:18 web-server-02      nginx:access       ERROR: SSL certificate expired for domain example.com
2024-01-15 14:19:05 app-server-01      custom:app         ERROR: Database connection failed - timeout after 30s

Showing 5 of 1,247 results`,
                        "search index=main source=\"firewall\" action=DENY | stats count by src_ip": `Searching index=main source="firewall" action=DENY | stats count by src_ip...
Results: 156 events found in the last 24 hours

src_ip          count
10.0.0.15       45
10.0.0.16       32
10.0.0.17       28
10.0.0.18       23
10.0.0.19       18
10.0.0.20       10

Total: 156 denied connections`,
                        "search index=main | timechart count by sourcetype": `Searching index=main | timechart count by sourcetype...
Results: Time-based chart of events by sourcetype

_time                apache:access    cisco:asa    mysql:error    nginx:access    custom:app
2024-01-15 14:00    1,234           567          89             234             123
2024-01-15 14:15    1,456           634          92             267             145
2024-01-15 14:30    1,678           712          95             289             167

Chart shows event counts per 15-minute interval`,
                        "search index=main | search user=\"admin\" | table _time, source, message": `Searching index=main | search user="admin" | table _time, source, message...
Results: 23 events found in the last 24 hours

_time                source              message
2024-01-15 14:23:12 web-server-01      User admin login successful from 10.0.0.15
2024-01-15 14:22:45 database-01        User admin executed query: SELECT * FROM users
2024-01-15 14:21:33 app-server-01      User admin accessed sensitive file: /etc/passwd
2024-01-15 14:20:18 web-server-01      User admin logout from 10.0.0.15
2024-01-15 14:19:05 database-01        User admin created new user: john.doe

Showing 5 of 23 results`,
                        "indexes": `Available Indexes:

Index Name        Event Count    Size        Status
main              2,847,392      847 GB      Active
_internal         45,234         12 GB       Active
_audit            23,456         8 GB        Active
security          12,345         4 GB        Active
network           34,567         15 GB       Active
application       67,890         25 GB       Active
system            89,123         35 GB       Active

Total Events: 3,120,007
Total Size: 946 GB`,
                        "sources": `Data Sources:

Source Type        Count    Examples
Firewall           5        cisco:asa, pfSense, iptables
Web Server         8        apache:access, nginx:access, iis
Database           4        mysql:error, postgresql, oracle
System             12       syslog, windows:eventlog, osx:system
Network            6        netflow, sflow, packet_capture
Application        15       custom:app, java:log, python:log
Security           7        ids:alert, edr:event, antivirus

Total Sources: 57`,
                        "sourcetypes": `Sourcetypes:

Category           Sourcetype
Web                apache:access, nginx:access, iis:access
Network            cisco:asa, netflow, sflow
Database           mysql:error, postgresql, oracle:error
System             syslog, windows:eventlog, osx:system
Security           ids:alert, edr:event, antivirus:scan
Application        custom:app, java:log, python:log
Firewall           pfSense, iptables, cisco:asa

Total Sourcetypes: 45`,
                        "stats": `Splunk System Statistics:

PERFORMANCE:
• Total events indexed: 3,120,007
• Events per second: 1,247
• Search performance: 95% queries < 5s
• Indexing rate: 1.2 GB/hour

RESOURCES:
• Storage used: 946 GB / 2 TB (47%)
• Memory usage: 8.5 GB / 16 GB (53%)
• CPU usage: 45%
• Disk I/O: 234 MB/s

LICENSE:
• Daily quota: 78% used
• License type: Enterprise
• Expiration: 2024-12-31`,
                        "users": `Active Users:

Username           Role              Last Activity    Status
admin              Administrator     2 minutes ago    Online
analyst1           Security Analyst  5 minutes ago    Online
analyst2           Security Analyst  12 minutes ago   Online
manager1           Security Manager  1 hour ago       Online
responder1         Incident Responder 3 minutes ago   Online
viewer1            Viewer            45 minutes ago   Online
auditor1           Auditor           2 hours ago      Offline

Total Users: 7
Online Users: 6`,
                        "alerts": `Recent Security Alerts (Last 24 hours):

HIGH PRIORITY:
• [14:23:12] Multiple failed login attempts from 10.0.0.15 (45 attempts)
• [13:45:33] Unusual network traffic to suspicious IP 185.220.101.45
• [12:18:47] Malware signature detected in file upload: trojan.exe

MEDIUM PRIORITY:
• [11:32:15] Privilege escalation attempt detected on web-server-01
• [10:55:22] Data exfiltration attempt blocked from database-01
• [09:28:14] Unusual PowerShell activity on workstation-05

LOW PRIORITY:
• [08:15:33] SSL certificate expired for domain old.example.com
• [07:42:18] High CPU usage detected on app-server-02

Total Alerts: 8 (3 high, 3 medium, 2 low priority)`
                    },
                    description: 'Enterprise SIEM platform for security monitoring and log analysis'
                },
                elk: {
                    name: 'ELK Stack (Elasticsearch, Logstash, Kibana)',
                    guide: `
<h3>ELK Stack (Elasticsearch, Logstash, Kibana)</h3>

<h4>What is the ELK Stack?</h4>
<p><b>ELK Stack</b> is a collection of three open-source tools: <b>Elasticsearch</b> (search engine), <b>Logstash</b> (log pipeline), and <b>Kibana</b> (visualization). Together, they provide a powerful platform for log analysis, security monitoring, and threat hunting.</p>
<p><b>Warning:</b> Only analyze data you are authorized to access. Log data may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> Follow the <a href='https://www.elastic.co/guide/en/elastic-stack/current/installing-elastic-stack.html' target='_blank'>Elastic Stack Installation Guide</a>.</li>
  <li><b>Windows/Mac:</b> Download and extract each component from <a href='https://www.elastic.co/downloads/' target='_blank'>elastic.co/downloads</a>.</li>
</ul>
<p>Start each service in order: Elasticsearch, Logstash, then Kibana.</p>

<h4>Starting the Stack</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@siem:~$</span> <span class='term-cmd'>elasticsearch &</span>
<span class='term-path'>user@siem:~$</span> <span class='term-cmd'>logstash -f /etc/logstash/conf.d/</span>
<span class='term-path'>user@siem:~$</span> <span class='term-cmd'>kibana &</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>elasticsearch &:</b> Starts the Elasticsearch search engine in the background.</li>
  <li><b>logstash -f ...:</b> Starts Logstash with your pipeline configuration.</li>
  <li><b>kibana &:</b> Starts the Kibana web interface in the background.</li>
</ul>

<h4>Accessing Kibana</h4>
<pre class='terminal-screenshot'><pre>[Web Browser]
URL: http://localhost:5601
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>URL:</b> The default address for the Kibana web UI.</li>
</ul>

<h4>Ingesting and Searching Logs</h4>
<pre class='terminal-screenshot'><pre>[Kibana Web UI]
Discover &rarr; Index: logstash-*
Search: <span class='term-cmd'>error</span>

@timestamp           message
2024-06-01T14:23:12  ERROR: Authentication failed for user admin from 10.0.0.15
2024-06-01T14:22:45  ERROR: Connection timeout to 192.168.1.100:443
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Discover:</b> The main search interface in Kibana.</li>
  <li><b>Index: logstash-*:</b> Selects all Logstash indices.</li>
  <li><b>Search: error:</b> Finds all log entries containing the word "error".</li>
</ul>

<h4>Visualizing Data with Dashboards</h4>
<pre class='terminal-screenshot'><pre>[Kibana Web UI]
Dashboards &rarr; Create Dashboard
Add Panel: Bar chart of denied firewall actions
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Dashboards:</b> Visualize search results with charts, tables, and graphs.</li>
  <li><b>Bar chart:</b> Example visualization of denied firewall actions.</li>
</ul>

<h4>Setting Up Alerts (Watcher)</h4>
<pre class='terminal-screenshot'><pre>[Kibana Web UI]
Stack Management &rarr; Watcher &rarr; Create Watch
Condition: More than 10 failed logins in 5 minutes
Action: Send email to soc@example.com
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Watcher:</b> Kibana's alerting feature for automated notifications.</li>
  <li><b>Condition:</b> Set thresholds for alerting (e.g., failed logins).</li>
  <li><b>Action:</b> Choose what happens when the alert triggers (e.g., send email).</li>
</ul>

<h4>Common Search Examples</h4>
<ul>
  <li><code>error</code> — Find all logs with the word "error".</li>
  <li><code>source:firewall AND action:deny</code> — Find denied firewall actions.</li>
  <li><code>@timestamp:[now-1h TO now]</code> — Show logs from the last hour.</li>
  <li><code>user:admin</code> — Find events related to the admin user.</li>
</ul>

<h4>Interpreting Results</h4>
<p>Kibana displays search results in tables and visualizations. Use filters and dashboards to spot trends, anomalies, and security incidents.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use specific search terms and filters to reduce noise.</li>
  <li>Build dashboards for SOC monitoring and executive reporting.</li>
  <li>Schedule alerts for critical events (failed logins, malware, etc.).</li>
  <li>Regularly update the ELK stack for new features and security patches.</li>
  <li>Restrict access to sensitive data and audit user activity.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.elastic.co/guide/en/elastic-stack/current/index.html' target='_blank'>Elastic Stack Documentation</a></li>
  <li><a href='https://www.elastic.co/downloads/' target='_blank'>Elastic Stack Downloads</a></li>
  <li><a href='https://www.elastic.co/guide/en/kibana/current/dashboard.html' target='_blank'>Kibana Dashboards Guide</a></li>
  <li><a href='https://www.youtube.com/watch?v=QkJvQ2U5r6A' target='_blank'>ELK Stack Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `ELK Stack - Available Commands:
• search [query] - Search Elasticsearch indices
• indices - List available Elasticsearch indices
• pipelines - Show Logstash processing pipelines
• dashboards - List Kibana dashboards
• status - Check health of all components
• nodes - Show cluster node information
• templates - List index templates

Example searches:
• search error
• search source:firewall AND action:deny
• search @timestamp:[now-1h TO now]`,
                        "search error": `Searching for "error" across all indices...
Found 892 documents in 0.045 seconds

Results:
• web-logs-2024.01.15: 234 errors
• system-logs-2024.01.15: 156 errors
• application-logs-2024.01.15: 502 errors

Top error types:
• Connection timeout: 45%
• Authentication failed: 32%
• Permission denied: 23%`,
                        "indices": `Elasticsearch Indices:
• web-logs-2024.01.15 (1.2GB, 45,234 docs)
• system-logs-2024.01.15 (856MB, 23,456 docs)
• application-logs-2024.01.15 (2.1GB, 67,890 docs)
• security-logs-2024.01.15 (445MB, 12,345 docs)
• network-logs-2024.01.15 (678MB, 34,567 docs)

Total indices: 15
Total storage: 5.3GB`,
                        "pipelines": `Logstash Processing Pipelines:
• web-logs-pipeline - Processes web server logs
• system-logs-pipeline - Processes system logs
• security-logs-pipeline - Processes security events
• network-logs-pipeline - Processes network traffic
• application-logs-pipeline - Processes application logs

Pipeline Status: All running
Total events processed: 183,492 in last hour`,
                        "dashboards": `Kibana Dashboards:
• Security Overview - Real-time security monitoring
• Network Traffic Analysis - Network flow visualization
• System Health - Infrastructure monitoring
• Application Performance - APM metrics
• User Activity - User behavior analytics
• Compliance Reporting - Regulatory dashboards

Access via: http://localhost:5601`,
                        "status": `ELK Stack Health Status:
• Elasticsearch: 🟢 Healthy (3 nodes, green status)
• Logstash: 🟢 Running (5 pipelines active)
• Kibana: 🟢 Available (http://localhost:5601)

Cluster Health: Green
Active Shards: 45/45
Indexing Rate: 1,234 docs/sec
Search Rate: 567 queries/sec`,
                        "nodes": `Elasticsearch Cluster Nodes:
• node-1 (Master): 192.168.1.10 - CPU: 45%, RAM: 67%
• node-2 (Data): 192.168.1.11 - CPU: 38%, RAM: 72%
• node-3 (Data): 192.168.1.12 - CPU: 42%, RAM: 69%

Cluster Status: Green
Total Nodes: 3
Active Shards: 45`,
                        "templates": `Index Templates:
• logstash-* - Default template for Logstash indices
• security-* - Template for security event indices
• web-* - Template for web server logs
• system-* - Template for system logs
• application-* - Template for application logs

Template Management: Use Kibana Index Management or API`
                    },
                    description: 'Open-source log analysis and visualization platform'
                },
                graylog: {
                    name: 'Graylog',
                    guide: `
<h3>Graylog</h3>

<h4>What is Graylog?</h4>
<p><b>Graylog</b> is an open-source log management platform for collecting, indexing, and analyzing log data in real time. It is widely used for security monitoring, threat detection, and compliance.</p>
<p><b>Warning:</b> Only analyze log data you are authorized to access. Log files may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> Follow the <a href='https://docs.graylog.org/docs/installation' target='_blank'>Graylog Installation Guide</a>.</li>
  <li><b>Windows:</b> Use the <a href='https://docs.graylog.org/docs/installation' target='_blank'>official documentation</a> for Windows setup.</li>
</ul>
<p>Graylog requires MongoDB and Elasticsearch. Start these services before launching Graylog.</p>

<h4>Starting Graylog</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@siem:~$</span> <span class='term-cmd'>sudo systemctl start mongod</span>
<span class='term-path'>user@siem:~$</span> <span class='term-cmd'>sudo systemctl start elasticsearch</span>
<span class='term-path'>user@siem:~$</span> <span class='term-cmd'>sudo systemctl start graylog-server</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>mongod:</b> Starts the MongoDB database service.</li>
  <li><b>elasticsearch:</b> Starts the Elasticsearch search engine.</li>
  <li><b>graylog-server:</b> Starts the Graylog server.</li>
</ul>

<h4>Accessing the Graylog Web Interface</h4>
<pre class='terminal-screenshot'><pre>[Web Browser]
URL: http://localhost:9000
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>URL:</b> The default address for the Graylog web UI.</li>
</ul>

<h4>Ingesting and Searching Logs</h4>
<pre class='terminal-screenshot'><pre>[Graylog Web UI]
Search &rarr; Streams: All messages
Query: <span class='term-cmd'>source:firewall AND action:deny</span>

Timestamp              Source      Message
2024-06-01T14:23:12    firewall1   Denied connection from 10.0.0.15
2024-06-01T14:22:45    firewall2   Denied connection from 192.168.1.100
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Streams:</b> Logical groupings of log messages (e.g., by source or type).</li>
  <li><b>Query:</b> Finds all denied firewall actions.</li>
</ul>

<h4>Visualizing Data with Dashboards</h4>
<pre class='terminal-screenshot'><pre>[Graylog Web UI]
Dashboards &rarr; Create Dashboard
Add Widget: Pie chart of log sources
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Dashboards:</b> Visualize search results with widgets (charts, tables, graphs).</li>
  <li><b>Pie chart:</b> Example visualization of log sources.</li>
</ul>

<h4>Setting Up Alerts</h4>
<pre class='terminal-screenshot'><pre>[Graylog Web UI]
Alerts &rarr; Event Definitions &rarr; Create Event Definition
Condition: More than 5 failed logins in 10 minutes
Action: Send email to soc@example.com
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Event Definitions:</b> Set up alert conditions and actions.</li>
  <li><b>Condition:</b> Set thresholds for alerting (e.g., failed logins).</li>
  <li><b>Action:</b> Choose what happens when the alert triggers (e.g., send email).</li>
</ul>

<h4>Common Search Examples</h4>
<ul>
  <li><code>error</code> — Find all logs with the word "error".</li>
  <li><code>source:web AND status:500</code> — Find web server errors.</li>
  <li><code>user:admin</code> — Find events related to the admin user.</li>
  <li><code>timestamp:[now-1h TO now]</code> — Show logs from the last hour.</li>
</ul>

<h4>Interpreting Results</h4>
<p>Graylog displays search results in tables and visualizations. Use filters and dashboards to spot trends, anomalies, and security incidents.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use streams to organize logs by source or type.</li>
  <li>Build dashboards for SOC monitoring and executive reporting.</li>
  <li>Set up alerts for critical events (failed logins, malware, etc.).</li>
  <li>Regularly update Graylog and its dependencies for security.</li>
  <li>Restrict access to sensitive data and audit user activity.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://docs.graylog.org/' target='_blank'>Graylog Documentation</a></li>
  <li><a href='https://docs.graylog.org/docs/installation' target='_blank'>Graylog Installation Guide</a></li>
  <li><a href='https://www.youtube.com/watch?v=6b1r6KQbQ9A' target='_blank'>Graylog Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `Graylog - Available Commands:
• search [query] - Search logs with Graylog query syntax
• streams - List message streams
• inputs - Show configured data inputs
• alerts - Show active alerts and notifications
• users - List users and their roles
• stats - Show system statistics
• nodes - Show cluster node information

Example searches:
• source:firewall AND action:deny
• level:ERROR OR level:CRITICAL
• message:"authentication failed"`,
                        "search source:firewall AND action:deny": `Searching for firewall deny actions...
Found 156 messages in the last 24 hours

Results:
• 2024-01-15 14:23:12 - DENY 10.0.0.15 -> 192.168.1.100 (Port 22)
• 2024-01-15 14:22:45 - DENY 10.0.0.16 -> 192.168.1.101 (Port 80)
• 2024-01-15 14:21:33 - DENY 10.0.0.17 -> 192.168.1.102 (Port 443)

Top denied IPs:
• 10.0.0.15: 45 denials
• 10.0.0.16: 32 denials
• 10.0.0.17: 28 denials`,
                        "streams": `Message Streams:
• Security Events - High-priority security alerts
• Network Traffic - Network flow and firewall logs
• System Logs - Operating system and service logs
• Application Logs - Application-specific events
• Compliance - Regulatory compliance events
• Performance - System performance metrics

Total Streams: 6
Total Messages: 2,847,392`,
                        "inputs": `Data Inputs:
• GELF UDP - Graylog Extended Log Format (UDP)
• GELF TCP - Graylog Extended Log Format (TCP)
• Syslog UDP - System logs via UDP
• Syslog TCP - System logs via TCP
• Beats - Filebeat, Packetbeat, etc.
• REST API - HTTP/REST input

Input Status: All active
Total Inputs: 12`,
                        "alerts": `Active Alerts:
• High CPU Usage - Triggered 5 minutes ago
• Multiple Failed Logins - Triggered 12 minutes ago
• Unusual Network Traffic - Triggered 23 minutes ago
• Disk Space Low - Triggered 1 hour ago

Alert History (Last 24h):
• Total Alerts: 15
• High Priority: 3
• Medium Priority: 8
• Low Priority: 4`,
                        "stats": `Graylog System Statistics:
• Total Messages: 2,847,392
• Messages per second: 1,234
• Index Size: 847 GB
• Active Streams: 6
• Active Inputs: 12
• Cluster Health: Green
• Uptime: 15 days, 7 hours`
                    },
                    description: 'Open-source log management and analysis platform'
                },
                ossec: {
                    name: 'OSSEC',
                    guide: `
<h3>OSSEC</h3>

<h4>What is OSSEC?</h4>
<p><b>OSSEC</b> is an open-source, host-based intrusion detection system (HIDS) for log analysis, file integrity checking, policy monitoring, rootkit detection, and real-time alerting. It is widely used for monitoring servers and endpoints across Linux, Windows, and macOS.</p>
<p><b>Warning:</b> Only monitor systems you are authorized to access. OSSEC logs and alerts may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> <code>sudo apt install ossec-hids</code> or follow the <a href='https://www.ossec.net/docs/manual/installation/index.html' target='_blank'>official guide</a>.</li>
  <li><b>Windows/Mac:</b> Download from <a href='https://www.ossec.net/downloads.html' target='_blank'>ossec.net/downloads.html</a>.</li>
</ul>

<h4>Starting OSSEC</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@bluebox:~$</span> <span class='term-cmd'>sudo systemctl start ossec</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>systemctl start ossec:</b> Starts the OSSEC service.</li>
</ul>

<h4>Checking OSSEC Status</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@bluebox:~$</span> <span class='term-cmd'>sudo systemctl status ossec</span>
</pre></pre>
<p>Shows whether OSSEC is running and its current status.</p>

<h4>Viewing Alerts</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@bluebox:~$</span> <span class='term-cmd'>cat /var/ossec/logs/alerts/alerts.log</span>

** Alert 2024 Jun 01 15:12:34 (bluebox) -> Rule: 1002 - Unknown problem somewhere in the system.
2024 Jun 01 15:12:34 bluebox->/var/log/auth.log
User root failed to authenticate from 10.0.0.15
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>alerts.log:</b> Main log file for OSSEC alerts.</li>
  <li><b>Rule:</b> The rule that triggered the alert.</li>
  <li><b>Source:</b> The log file and event that caused the alert.</li>
</ul>

<h4>Common Commands</h4>
<ul>
  <li><code>sudo systemctl start ossec</code> — Start OSSEC service</li>
  <li><code>sudo systemctl stop ossec</code> — Stop OSSEC service</li>
  <li><code>sudo systemctl status ossec</code> — Check OSSEC status</li>
  <li><code>cat /var/ossec/logs/alerts/alerts.log</code> — View alerts</li>
  <li><code>sudo /var/ossec/bin/ossec-control status</code> — OSSEC control script</li>
</ul>

<h4>Interpreting Results</h4>
<p>OSSEC alerts are found in <code>/var/ossec/logs/alerts/alerts.log</code>. Review alerts for suspicious activity, failed logins, file changes, and policy violations.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Regularly review and tune OSSEC rules to reduce false positives.</li>
  <li>Forward OSSEC alerts to a SIEM for centralized monitoring.</li>
  <li>Monitor file integrity and critical system files.</li>
  <li>Update OSSEC and rules for new detection capabilities.</li>
  <li>Restrict access to OSSEC logs and audit their usage.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://www.ossec.net/docs/' target='_blank'>OSSEC Documentation</a></li>
  <li><a href='https://www.ossec.net/downloads.html' target='_blank'>OSSEC Downloads</a></li>
  <li><a href='https://www.youtube.com/watch?v=Qw2rL2QvTVw' target='_blank'>OSSEC Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `OSSEC - Available Commands:
• start - Start OSSEC service
• stop - Stop OSSEC service
• status - Check OSSEC status
• alerts - View recent alerts
• logs - Show OSSEC logs
• config - Show OSSEC configuration
• rules - List OSSEC rules

Example: start - Begin monitoring
`,
                        "start": `Starting OSSEC...
OSSEC service started successfully.

Final Statistics:
• Alerts generated: 0
• Rules matched: 0
• Log entries: 0`,
                        "stop": `Stopping OSSEC...
OSSEC service stopped successfully.

Final Statistics:
• Alerts generated: 0
• Rules matched: 0
• Log entries: 0`,
                        "status": `OSSEC Status:
• Service: Running
• Alerts: 0
• Rules: 0
• Log entries: 0`,
                        "alerts": `Recent OSSEC Alerts (Last 24 hours):
• [14:23:12] [1:1002] Unknown problem somewhere in the system.
• [13:45:33] [1:1003] Unauthorized access attempt from 10.0.0.15
• [12:18:47] [1:1004] Suspicious file modification detected: /etc/passwd

Alert Summary:
• High Priority: 1 alert
• Medium Priority: 1 alert
• Low Priority: 1 alert
• Total: 3 alerts`,
                        "logs": `OSSEC Logs (Last 24 hours):
• [14:23:12] [1:1002] Unknown problem somewhere in the system.
• [13:45:33] [1:1003] Unauthorized access attempt from 10.0.0.15
• [12:18:47] [1:1004] Suspicious file modification detected: /etc/passwd`,
                        "config": `OSSEC Configuration:
• Main config: /etc/ossec/ossec.conf
• Rules directory: /etc/ossec/rules/
• Log directory: /var/ossec/logs/
• Alert file: /var/ossec/logs/alerts/alerts.log
• Interface: eth0
• Mode: Network IDS

PREPROCESSORS:
• file_integrity: File integrity monitoring
• rootkit: Rootkit detection
• intrusion_detection: Intrusion detection
• policy_monitoring: Policy monitoring

OUTPUT PLUGINS:
• alert_fast: Fast alerting
• log_tcpdump: Packet logging
• unified2: Unified2 output format`,
                        "rules": `Loaded OSSEC Rules:
• 1002 - Unknown problem somewhere in the system.
• 1003 - Unauthorized access attempt from 10.0.0.15
• 1004 - Suspicious file modification detected: /etc/passwd

Total Rules: 3
Active Rules: 3`,
                        "test-rule": `Testing rule syntax...
Rule: alert tcp any any -> any 80 (msg:"Test Rule"; sid:9999;)

Syntax check: PASSED
Rule components:
• Action: alert
• Protocol: tcp
• Source: any:any
• Destination: any:80
• Options: msg:"Test Rule", sid:9999

Rule is valid and ready to use.`
                    },
                    description: 'Host-based intrusion detection system'
                },
                wazuh: {
                    name: 'Wazuh',
                    guide: `
<h3>Wazuh</h3>

<h4>What is Wazuh?</h4>
<p><b>Wazuh</b> is an open-source security platform that provides unified SIEM, XDR, and security analytics. It extends OSSEC with advanced log analysis, file integrity monitoring, vulnerability detection, and a modern web interface for managing alerts and agents.</p>
<p><b>Warning:</b> Only monitor systems you are authorized to access. Wazuh logs and alerts may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> Follow the <a href='https://documentation.wazuh.com/current/installation-guide/index.html' target='_blank'>Wazuh Installation Guide</a> for your OS.</li>
  <li><b>Windows/Mac:</b> Download the agent from <a href='https://wazuh.com/download/' target='_blank'>wazuh.com/download</a>.</li>
</ul>

<h4>Starting Wazuh Manager</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@bluebox:~$</span> <span class='term-cmd'>sudo systemctl start wazuh-manager</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>wazuh-manager:</b> The main Wazuh server component that processes data from agents.</li>
</ul>

<h4>Accessing the Wazuh Web Interface</h4>
<pre class='terminal-screenshot'><pre>[Web Browser]
URL: https://localhost:5601
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>URL:</b> The default address for the Wazuh web UI (integrated with Kibana).</li>
</ul>

<h4>Viewing Alerts and Security Events</h4>
<pre class='terminal-screenshot'><pre>[Wazuh Web UI]
Security Events &rarr; All Events

Timestamp              Rule      Level   Description
2024-06-01T15:12:34    1002      5       Failed SSH login from 10.0.0.15
2024-06-01T15:10:12    1004      7       Suspicious file modification: /etc/passwd
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Security Events:</b> Main dashboard for alerts and incidents.</li>
  <li><b>Rule/Level:</b> The rule triggered and its severity.</li>
  <li><b>Description:</b> Details of the event.</li>
</ul>

<h4>Adding and Managing Agents</h4>
<pre class='terminal-screenshot'><pre>[Wazuh Web UI]
Agents &rarr; Add Agent

Agent Name: webserver01
OS: Linux
Status: Active
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Agents:</b> Monitored endpoints (servers, workstations, etc.).</li>
  <li><b>Add Agent:</b> Register a new endpoint for monitoring.</li>
</ul>

<h4>Common Commands</h4>
<ul>
  <li><code>sudo systemctl start wazuh-manager</code> — Start Wazuh manager</li>
  <li><code>sudo systemctl status wazuh-manager</code> — Check manager status</li>
  <li><code>sudo systemctl restart wazuh-manager</code> — Restart manager</li>
  <li><code>sudo systemctl stop wazuh-manager</code> — Stop manager</li>
  <li><code>sudo /var/ossec/bin/agent_control -l</code> — List registered agents</li>
</ul>

<h4>Interpreting Results</h4>
<p>Wazuh alerts and events are shown in the web UI and stored in log files. Review high-severity alerts and investigate suspicious activity promptly.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Regularly update Wazuh and its rules for new detection capabilities.</li>
  <li>Integrate Wazuh with SIEM tools for centralized monitoring.</li>
  <li>Monitor agent status and investigate offline or misconfigured agents.</li>
  <li>Customize alert rules to fit your environment and reduce false positives.</li>
  <li>Restrict access to the Wazuh web UI and audit its usage.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://documentation.wazuh.com/current/index.html' target='_blank'>Wazuh Documentation</a></li>
  <li><a href='https://wazuh.com/download/' target='_blank'>Wazuh Downloads</a></li>
  <li><a href='https://www.youtube.com/watch?v=Qw2rL2QvTVw' target='_blank'>Wazuh Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `Wazuh - Available Commands:
• start - Start Wazuh service
• stop - Stop Wazuh service
• status - Check Wazuh status
• alerts - View recent alerts
• logs - Show Wazuh logs
• config - Show Wazuh configuration
• rules - List Wazuh rules

Example: start - Begin monitoring
`,
                        "start": `Starting Wazuh...
Wazuh service started successfully.

Final Statistics:
• Alerts generated: 0
• Rules matched: 0
• Log entries: 0`,
                        "stop": `Stopping Wazuh...
Wazuh service stopped successfully.

Final Statistics:
• Alerts generated: 0
• Rules matched: 0
• Log entries: 0`,
                        "status": `Wazuh Status:
• Service: Running
• Alerts: 0
• Rules: 0
• Log entries: 0`,
                        "alerts": `Recent Wazuh Alerts (Last 24 hours):
• [14:23:12] [1:1002] Unknown problem somewhere in the system.
• [13:45:33] [1:1003] Unauthorized access attempt from 10.0.0.15
• [12:18:47] [1:1004] Suspicious file modification detected: /etc/passwd

Alert Summary:
• High Priority: 1 alert
• Medium Priority: 1 alert
• Low Priority: 1 alert
• Total: 3 alerts`,
                        "logs": `Wazuh Logs (Last 24 hours):
• [14:23:12] [1:1002] Unknown problem somewhere in the system.
• [13:45:33] [1:1003] Unauthorized access attempt from 10.0.0.15
• [12:18:47] [1:1004] Suspicious file modification detected: /etc/passwd`,
                        "config": `Wazuh Configuration:
• Main config: /etc/ossec/ossec.conf
• Rules directory: /etc/ossec/rules/
• Log directory: /var/ossec/logs/
• Alert file: /var/ossec/logs/alerts/alerts.log
• Interface: eth0
• Mode: Network IDS

PREPROCESSORS:
• file_integrity: File integrity monitoring
• rootkit: Rootkit detection
• intrusion_detection: Intrusion detection
• policy_monitoring: Policy monitoring

OUTPUT PLUGINS:
• alert_fast: Fast alerting
• log_tcpdump: Packet logging
• unified2: Unified2 output format`,
                        "rules": `Loaded Wazuh Rules:
• 1002 - Unknown problem somewhere in the system.
• High Priority: 5 alerts
• Medium Priority: 12 alerts
• Low Priority: 18 alerts
• Total: 35 alerts`,
                        "files": `Extracted Files (Last 24 hours):
• suspicious_document.pdf (2.3 MB) - Extracted from HTTP traffic
• malware_sample.exe (1.7 MB) - Extracted from HTTP traffic
• phishing_email.eml (45 KB) - Extracted from SMTP traffic
• malicious_script.js (12 KB) - Extracted from HTTP traffic

File Analysis:
• PDF files: 3 (2 suspicious)
• Executables: 5 (4 malicious)
• Scripts: 8 (6 malicious)
• Documents: 12 (3 suspicious)

Total files: 28
Malicious files: 15 (53.6%)`,
                        "stats": `Suricata Statistics:
• Packets Processed: 2,345,678
• Packets Dropped: 0
• Packets Ignored: 23,456
• Alerts Generated: 35
• Rules Matched: 67
• Files Extracted: 28
• TCP Sessions: 23,456
• UDP Sessions: 12,345
• HTTP Requests: 45,678

Performance Metrics:
• Packets per second: 2,345
• Memory usage: 2.1 GB
• CPU usage: 18%
• Disk I/O: 67 MB/s`
                    },
                    description: 'High-performance network IDS/IPS and NSM engine'
                }
            }
        },
        {
            name: 'Endpoint Protection & Monitoring',
            activity: '🖥️ Monitoring and protecting endpoints from threats and suspicious activity',
            tools: {
                osquery: {
                    name: 'OSQuery',
                    guide: `
<h3>OSQuery</h3>

<h4>What is OSQuery?</h4>
<p><b>OSQuery</b> is an open-source tool that exposes an operating system as a high-performance relational database. You can write SQL-based queries to explore system data, monitor endpoints, and detect suspicious activity across Windows, Linux, and macOS.</p>
<p><b>Warning:</b> Only query systems you are authorized to access. System data may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li><b>Linux:</b> <code>sudo apt install osquery</code> or follow the <a href='https://osquery.io/downloads/official' target='_blank'>official guide</a>.</li>
  <li><b>Windows/Mac:</b> Download from <a href='https://osquery.io/downloads/official' target='_blank'>osquery.io/downloads/official</a>.</li>
</ul>

<h4>Starting OSQuery Shell</h4>
<pre class='terminal-screenshot'><pre><span class='term-path'>user@bluebox:~$</span> <span class='term-cmd'>osqueryi</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>osqueryi:</b> Launches the interactive OSQuery shell for running SQL queries.</li>
</ul>

<h4>Example Queries</h4>
<pre class='terminal-screenshot'><pre>osquery> <span class='term-cmd'>SELECT * FROM processes WHERE name = 'sshd';</span>

pid   name  path                cmdline
1234  sshd  /usr/sbin/sshd      /usr/sbin/sshd -D
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>SELECT * FROM processes WHERE name = 'sshd';</b> Lists all running SSH daemon processes.</li>
  <li><b>pid/name/path/cmdline:</b> Columns in the query result.</li>
</ul>

<pre class='terminal-screenshot'><pre>osquery> <span class='term-cmd'>SELECT username, uid, gid FROM users WHERE username = 'root';</span>

username  uid  gid
root      0    0
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>SELECT username, uid, gid FROM users WHERE username = 'root';</b> Shows user info for root.</li>
</ul>

<pre class='terminal-screenshot'><pre>osquery> <span class='term-cmd'>SELECT * FROM listening_ports;</span>

pid   port  protocol  address
1234  22    tcp       0.0.0.0
5678  80    tcp       0.0.0.0
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>SELECT * FROM listening_ports;</b> Lists all open network ports and associated processes.</li>
</ul>

<h4>Common Use Cases</h4>
<ul>
  <li>Monitor running processes and network connections.</li>
  <li>Detect new or suspicious users and groups.</li>
  <li>Audit installed software and system configuration.</li>
  <li>Track file changes and system events.</li>
</ul>

<h4>Interpreting Results</h4>
<p>OSQuery returns results in table format. Use SQL queries to filter, join, and analyze system data for security monitoring and incident response.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Write specific queries to reduce noise and focus on relevant data.</li>
  <li>Automate queries with scheduled queries and logging.</li>
  <li>Integrate OSQuery with SIEM tools for centralized monitoring.</li>
  <li>Regularly update OSQuery for new features and security patches.</li>
  <li>Restrict access to OSQuery and audit its usage.</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://osquery.readthedocs.io/en/stable/' target='_blank'>OSQuery Documentation</a></li>
  <li><a href='https://osquery.io/downloads/official' target='_blank'>OSQuery Downloads</a></li>
  <li><a href='https://www.youtube.com/watch?v=Qw2rL2QvTVw' target='_blank'>OSQuery Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `OSQuery - Available Commands:\n• query [SQL] - Run an osquery SQL query\n• tables - List available tables\n• examples - Show example queries\n\nExample: query SELECT * FROM processes WHERE name='ssh';`,
                        "query SELECT * FROM processes WHERE name='ssh';": `pid: 1234, name: ssh, user: root, state: running`,
                        "tables": `Available Tables:\n• processes\n• users\n• listening_ports\n• logged_in_users\n• file\n• system_info\n• kernel_info\n• crontab\n• etc_hosts\n• ...`,
                        "examples": `Example Queries:\n• query SELECT * FROM users;\n• query SELECT * FROM listening_ports WHERE port=22;\n• query SELECT * FROM processes WHERE name='explorer.exe';\n• query SELECT * FROM system_info;`
                    },
                    description: 'SQL-powered endpoint visibility and monitoring framework'
                },
                sysmon: {
                    name: 'Sysmon',
                    guide: `
<h3>Sysmon</h3>

<h4>What is Sysmon?</h4>
<p><b>Sysmon</b> (System Monitor) is a Windows system service and device driver that logs detailed information about process creations, network connections, file changes, and more to the Windows Event Log. It is widely used for endpoint monitoring and threat detection.</p>
<p><b>Warning:</b> Only monitor systems you are authorized to access. Sysmon logs may contain sensitive information.</p>

<h4>Installation</h4>
<ul>
  <li>Download Sysmon from the <a href='https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon' target='_blank'>Microsoft Sysinternals website</a>.</li>
  <li>Extract the zip file and open a Command Prompt as Administrator.</li>
</ul>

<h4>Basic Usage: Install and Start Sysmon</h4>
<pre class='terminal-screenshot'><pre>C:\Windows\System32&gt; <span class='term-cmd'>Sysmon64.exe -i -accepteula</span>
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>-i:</b> Installs Sysmon as a service.</li>
  <li><b>-accepteula:</b> Accepts the license agreement.</li>
</ul>

<h4>Using a Configuration File</h4>
<pre class='terminal-screenshot'><pre>C:\Windows\System32&gt; <span class='term-cmd'>Sysmon64.exe -c sysmon-config.xml</span>
</pre></pre>
<p><b>-c sysmon-config.xml:</b> Loads a custom configuration file to specify what events to log.</p>

<h4>Example Event Log Output</h4>
<pre class='terminal-screenshot'><pre>[Windows Event Viewer]
Log: Microsoft-Windows-Sysmon/Operational
Event ID: 1 (Process Create)

ProcessId: 1234
Image: C:\Windows\System32\cmd.exe
CommandLine: cmd.exe /c whoami
User: WIN-USER\Administrator
</pre></pre>
<p><b>Explanation:</b>
<ul>
  <li><b>Event ID 1:</b> Indicates a process creation event.</li>
  <li><b>Image:</b> The executable that was run.</li>
  <li><b>CommandLine:</b> The command used to launch the process.</li>
  <li><b>User:</b> The user account that started the process.</li>
</ul>

<h4>Common Commands</h4>
<ul>
  <li><code>Sysmon64.exe -i -accepteula</code> — Install Sysmon with default settings</li>
  <li><code>Sysmon64.exe -c sysmon-config.xml</code> — Update configuration</li>
  <li><code>Sysmon64.exe -u</code> — Update Sysmon to a new version</li>
  <li><code>Sysmon64.exe -h</code> — Show help</li>
  <li><code>Sysmon64.exe -?</code> — Show command-line options</li>
</ul>

<h4>Interpreting Results</h4>
<p>Sysmon logs are found in the Windows Event Viewer under <b>Applications and Services Logs &rarr; Microsoft &rarr; Windows &rarr; Sysmon &rarr; Operational</b>. Review events for suspicious process launches, network connections, and file changes.</p>

<h4>Tips & Best Practices</h4>
<ul>
  <li>Use a well-maintained configuration file (e.g., <a href='https://github.com/SwiftOnSecurity/sysmon-config' target='_blank'>SwiftOnSecurity/sysmon-config</a>).</li>
  <li>Forward Sysmon logs to a SIEM for centralized analysis.</li>
  <li>Regularly update Sysmon and your configuration for new detection capabilities.</li>
  <li>Restrict access to logs and audit their usage.</li>
  <li>Monitor for high-value events (e.g., Event ID 1: Process Create, Event ID 3: Network Connection).</li>
</ul>

<h4>Resources & Links</h4>
<ul>
  <li><a href='https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon' target='_blank'>Sysmon Documentation & Download</a></li>
  <li><a href='https://github.com/SwiftOnSecurity/sysmon-config' target='_blank'>SwiftOnSecurity Sysmon Config</a></li>
  <li><a href='https://www.youtube.com/watch?v=Qw2rL2QvTVw' target='_blank'>Sysmon Demo Video</a></li>
</ul>
`,
                    commands: {
                        "help": `Sysmon - Available Commands:\n• status - Show Sysmon status\n• config - Show current configuration\n• logs - Show recent Sysmon logs\n\nExample: status`,
                        "status": `Sysmon is running. Version: 14.0.0.0\nMonitored events: Process Create, Network Connect, File Create, Registry, DNS Query`,
                        "config": `Sysmon Configuration:\n• Log process creation: enabled\n• Log network connections: enabled\n• Log file creation: enabled\n• Hash algorithms: SHA256, MD5\n• Log DNS queries: enabled`,
                        "logs": `Recent Sysmon Logs:\n• [14:23:12] Process Create: powershell.exe (PID 4321)\n• [14:22:45] Network Connect: 192.168.1.100:443\n• [14:21:33] File Create: C:\\temp\\malware.exe\n• [14:20:18] DNS Query: suspicious-domain.com`
                    },
                    description: 'Windows system activity monitoring and logging tool'
                },
                crowdstrike: {
                    name: 'CrowdStrike Falcon',
                    guide: `<h3>🖥️ CrowdStrike Falcon</h3>
<p><b>What is it?</b><br>CrowdStrike Falcon is a cloud-delivered endpoint protection platform that combines antivirus, EDR, and threat intelligence. It uses lightweight agents and cloud analytics to detect and respond to threats in real time.</p>
<p><b>Key Features:</b></p>
<ul>
<li>Cloud-based EDR and antivirus</li>
<li>Threat intelligence integration</li>
<li>Real-time detection and response</li>
<li>Lightweight agent</li>
<li>Incident investigation and remediation</li>
</ul>
<p><b>Available Commands:</b></p>
<ul>
<li><code>help</code> - Show available commands</li>
<li><code>status</code> - Show agent status</li>
<li><code>alerts</code> - Show recent alerts</li>
<li><code>scan</code> - Simulate a malware scan</li>
</ul>`,
                    commands: {
                        "help": `CrowdStrike Falcon - Available Commands:\n• status - Show agent status\n• alerts - Show recent alerts\n• scan - Simulate a malware scan\n\nExample: status`,
                        "status": `CrowdStrike Falcon agent is running and healthy. Last cloud sync: 2 minutes ago.`,
                        "alerts": `Recent Alerts:\n• [14:23:12] Malware detected and quarantined: ransomware.exe\n• [13:45:33] Suspicious PowerShell activity\n• [12:18:47] Lateral movement attempt blocked`,
                        "scan": `Simulating malware scan...\nNo threats detected. System is clean.`
                    },
                    description: 'Cloud-delivered EDR and endpoint protection platform'
                },
                carbonblack: {
                    name: 'Carbon Black',
                    guide: `<h3>🖥️ Carbon Black</h3>
<p><b>What is it?</b><br>Carbon Black is an endpoint security platform for threat detection, incident response, and forensics. It continuously records and stores endpoint activity data, enabling security teams to detect, respond to, and remediate threats.</p>
<p><b>Key Features:</b></p>
<ul>
<li>Continuous endpoint activity recording</li>
<li>Threat detection and response</li>
<li>Incident investigation and forensics</li>
<li>Behavioral analytics</li>
<li>Integration with SIEMs and SOAR</li>
</ul>
<p><b>Available Commands:</b></p>
<ul>
<li><code>help</code> - Show available commands</li>
<li><code>status</code> - Show agent status</li>
<li><code>alerts</code> - Show recent alerts</li>
<li><code>investigate</code> - Simulate an incident investigation</li>
</ul>`,
                    commands: {
                        "help": `Carbon Black - Available Commands:\n• status - Show agent status\n• alerts - Show recent alerts\n• investigate - Simulate an incident investigation\n\nExample: status`,
                        "status": `Carbon Black agent is running and healthy. Last event upload: 5 minutes ago.`,
                        "alerts": `Recent Alerts:\n• [14:23:12] Ransomware blocked: cryptolocker.exe\n• [13:45:33] Unusual process injection detected\n• [12:18:47] Suspicious network connection blocked`,
                        "investigate": `Simulating incident investigation...\nNo active threats found. All endpoints are secure.`
                    },
                    description: 'Endpoint security platform for detection, response, and forensics'
                }
            }
        }
    ];

    // Flatten tools for search and selection
    const allTools = {};
    blueCategories.forEach(cat => {
        Object.entries(cat.tools).forEach(([key, tool]) => {
            allTools[key] = tool;
        });
    });

    // UI rendering
    const toolList = document.getElementById('tool-list');
    const toolSearch = document.getElementById('tool-search');
    const toolGuide = document.getElementById('main-tool-guide');
    let currentToolKey = null;
    let currentCategory = null;

    function renderToolList(filter = "") {
        toolList.innerHTML = "";
        blueCategories.forEach(cat => {
            // Filter tools in this category
            const filtered = Object.entries(cat.tools).filter(([key, tool]) => {
                return (
                    tool.name.toLowerCase().includes(filter) ||
                    (tool.description && tool.description.toLowerCase().includes(filter))
                );
            });
            if (filtered.length > 0) {
                // Category header
                const header = document.createElement('li');
                header.textContent = cat.name;
                header.className = 'tool-category-header';
                header.style.cssText = 'font-weight:bold;margin-top:18px;margin-bottom:6px;color:#00eaff;font-size:1.08em;background:none;cursor:default;';
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
            for (const cat of blueCategories) {
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
    }

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
    const firstCat = blueCategories[0];
    selectTool(Object.keys(firstCat.tools)[0], firstCat);

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
