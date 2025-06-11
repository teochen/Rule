Loon 介绍
Loon是一款iOS上强大的网络工具，支持基于域名、IP、URL，SSID规则进行分流，强大的策略组组合可以满足任何的网络分流需求；Loon可以抓取、保存、修改HTTP/HTTPs流量，配合Javascript可以处理任何复杂的需求。
节点（代理服务器）
一个节点表示一个代理服务器，你可以手动添加单个节点，也可以通过链接下载订阅节点。Loon 本身不提供任何的节点
订阅节点
订阅节点是你的服务提供商提供的节点的集合，Loon只负责下载、解析这些节点，在Loon App中是无法修改这些节点的，如需修改请联系您的订阅提供商
关于订阅节点的流量明细
目前Loon会读取订阅响应header中的Subscription-Userinfo信息，具体格式如下：
Subscription-Userinfo:upload=1111;download=111;total=123456;expire=1614527045

代理服务协议
代理服务协议指的是在进行网络传输的过程中客户端和服务端需要遵循的一种数据组装格式，只有服务端和客户端使用相同的协议，两者才能进行正常的数据交互，我们每天在网络中接触到的协议有HTTP，HTTPS等
Loon支持以下协议
•	ShadowSocks (stream/aead/2022)
o	ShadowSocks + shadow-tls2/3
o	ShadowSocks + simpleObfs
o	ShadowSocks + simpleObfs + shadow-tls2/3
•	ShadowSocksR
o	ShadowSocksR + shadow-tls2/3
•	VMESS
o	VMESS + TLS
o	VMESS + WebSocket
o	VMESS + WebSocket + TLS
o	VMESS + HTTP
o	VMESS + HTTP + TLS
•	VLESS
o	VLESS + WebSocket
o	VLESS + HTTP
o	VLESS + xtls-rprx-vision + reality
•	Trojan
o	Trojan + WebSocket
o	Trojan + HTTP
•	HTTP
•	HTTPS
•	Socks5
•	Wireguard
•	Hysteria2
•	Custom by JS
截止 3.2.1（727）Loon所支持的协议中仅 HTTP/S 和 Custom by JS 协议不支持UDP中继
同时，Loon也支持使用JavaScript进行自定义代理协议，可参考使用JS自定义HTTP代理
节点格式
如果要在配置文件中手动添加、修改单个节点，请遵从下面的格式
#ss
# 节点名称 = 协议，服务器地址，端口，加密方式，密码，fast-open=是否开启fast open（需要节点支持），udp=是否在UDP中使用（需要节点支持）,udp-port=shadow-tls由于暂时不支持udp转发，这里填写原ss 端口用作UDP转发
ss1 = Shadowsocks,example.com,443,aes-128-gcm,"password",fast-open=false,udp=true
ss2 = Shadowsocks,example2.com,443,chacha20,"password",fast-open=true,udp=true
ss3 = Shadowsocks,example2.com,443,2022-blake3-aes-128-gcm,"MjdlZmY4YWIyZDU0OGNkNw==:YmY2N2QzZjctMjYxMi00MA==",fast-open=true,udp=true,shadow-tls-password=1,shadow-tls-sni=douyin.com,shadow-tls-version=3,udp-port=8396

#ss+simple obfs
# 节点名称 = 协议，服务器地址，端口，加密方式，密码，混淆方式=http|tls，obfs-host=混淆host，obfs-uri=混淆路径，fast-open=是否开启fast open（需要节点支持），udp=是否在UDP中使用（需要节点支持）
ssObfs1 = Shadowsocks,example.com,80,aes-128-gcm,"password",obfs-name=http,obfs-host=www.micsoft.com,obfs-uri=/,fast-open=true,udp=true
ssObfs2 = Shadowsocks,example.com,443,aes-128-gcm,"password",obfs-name=tls,obfs-host=www.micsoft.com,obfs-uri=/,fast-open=true,udp=true

#ssr
# 节点名称 = 协议，服务器地址，端口，加密方式，密码，protocol = 协议，protocol-param = 协议参数，obfs=混淆，obfs-param=混淆参数，fast-open=是否开启fast open（需要节点支持），udp=是否在UDP中使用（需要节点支持）
ssr1 = ShadowsocksR,example.com,443,aes-256-cfb,"password",protocol=origin,obfs=http_simple,obfs-param=download.windows.com,fast-open=false,udp=true
ssr2 = ShadowsocksR,example.com,10076,aes-128-cfb,"password",protocol=auth_chain_a,protocol-param=9555:loon,obfs=http_post,obfs-param=download.windows.com,fast-open=false,udp=true
ssr3 = ShadowsocksR,example.com,10076,chacha20,"password",protocol=auth_aes128_md5,protocol-param=9555:loon,obfs=tls1.2_ticket_auth,obfs-param=download.windows.com,fast-open=false,udp=true
ssr4 = ShadowsocksR,example.com,10076,chacha20-ietf,"password",protocol=auth_aes128_sha1,protocol-param=9555:loon,obfs=plain,fast-open=false,udp=true

#http
# 节点名称 = 协议，服务器地址，端口，加密方式，密码
http1 = http,example.com,80
http2 = http,example.com,80,username,"password"

#https
# 节点名称 = 协议，服务器地址，端口，加密方式，密码，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹
https1 = https,example.com,8080
# 如果username中包含英文逗号，请使用双引号包裹username
https2 = https,example.com,8080,"user,name","password"
https3 = https,example.com,443,username,"password",skip-cert-verify=true,sni=example.com,tls-pubkey-sha256=	
a1eab144ec9186933ef4ffd56fab7e3681dcd94a1ab7a0ca522a38f9ed8ebe1b,tls-cert-sha256=377A27032578E64BF5F8CA5E90192E0DB2DCD53B275D4E53BAA50307C51C189E

#socks5
# 节点名称 = 协议，服务器地址，端口，加密方式，密码，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
socks5 = socks5,example.com,443,username,"password",skip-cert-verify=true,sni=example.com,udp=true
# 如果username中包含英文逗号，请使用双引号包裹username
socks5 = socks5,example.com,8080,"user,name","password"

#vmess+tcp
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=tcp，alterId=alterId（默认0，表示开启aead），udp=是否在UDP中使用（需要节点支持）
vmess1 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=tcp,alterId=0,over-tls=false,udp=true

#vmess+tcp+tls
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=tcp，alterId=alterId（默认0，表示开启aead），over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
vmess2 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=tcp,alterId=0,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true,udp=true

#vmess+ws
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=ws，alterId=alterId（默认0，表示开启aead），path=websocket握手header中的path，host=websocket握手header中的host，udp=是否在UDP中使用（需要节点支持）
vmess3 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=ws,alterId=0,path=/,host=v3-dy-y.ixigua.com,over-tls=false,udp=true

#vmess+wss
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=ws，alterId=alterId（默认0，表示开启aead），path=websocket握手header中的path，host=websocket握手header中的host，over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
vmess4 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=ws,alterId=0,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true,udp=true

#vmess+http
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=http，alterId=alterId（默认0，表示开启aead），path=httpheader中的path，host=httpheader的host，udp=是否在UDP中使用（需要节点支持）
vmess5 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=http,alterId=0,path=/,host=v3-dy-y.ixigua.com,over-tls=false,udp=true

#vmess+http+tls
# 节点名称 = 协议，服务器地址，端口，加密方式，UUID，transport(传输方式)=http，alterId=alterId（默认0，表示开启aead），path=httpheader中的path，host=httpheader的host，over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
vmess6 = vmess,example.com,10086,aes-128-gcm,"52396e06-041a-4cc2-be5c-8525eb457809",transport=http,alterId=0,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true,udp=true

#VLESS+tcp
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=tcp，udp=是否在UDP中使用（需要节点支持）
VLESS1 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=tcp,over-tls=false,udp=true

#VLESS+tcp+tls
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=tcp，over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
VLESS2 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=tcp,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true,udp=true

#VLESS+ws
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=ws，path=websocket握手header中的path，host=websocket握手header中的host，udp=是否在UDP中使用（需要节点支持）
VLESS3 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=ws,path=/,host=v3-dy-y.ixigua.com,over-tls=false,udp=true

#VLESS+wss
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=ws，path=websocket握手header中的path，host=websocket握手header中的host，over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
VLESS4 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=ws,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true

#VLESS+http
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=http，path=httpheader中的path，host=httpheader的host，udp=是否在UDP中使用（需要节点支持）
VLESS5 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=http,path=/,host=v3-dy-y.ixigua.com,over-tls=false,udp=true

#VLESS+http+tls
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=http，path=httpheader中的path，host=httpheader的host，over-tls=是否启用TLS，sni=SNI，skip-cert-verify=是否跳过证书校验（默认否），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持）
VLESS6 = VLESS,example.com,10086,"52396e06-041a-4cc2-be5c-8525eb457809",transport=http,path=/,host=v3-dy-y.ixigua.com,over-tls=true,sni=example.com,skip-cert-verify=true,udp=true

#VLESS + xtls-rprx-vision + reality
# 节点名称 = 协议，服务器地址，端口，UUID，transport(传输方式)=tcp，flow=目前固定是xtls-rprx-vision，public-key=reality的服务器公钥，sni=对应服务端的serverName
VLESS6 = VLESS,192.168.2.11,2345,"ae521383-9375-2e0d-c347-48cf3d98eb6e",transport=tcp,flow=xtls-rprx-vision,public-key="LgJ9bNTyUqBLFkDA12-QgEL7c1yQ1ztk-V1Q-3OLXSk",short-id=164168844958a16d,udp=true,over-tls=true,sni=douyin.com,skip-cert-verify=true

#trojan
# 节点名称 = 协议，服务器地址，端口，alpn=tls扩展，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，udp=是否在UDP中使用（需要节点支持），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹
trojan1 = trojan,example.com,443,"password",alpn=http1.1,skip-cert-verify=false,sni=example.com,udp=true

#trojan+ws
# 节点名称 = 协议，服务器地址，端口，alpn=tls扩展，transport(传输方式)=ws，path=websocket握手header中的path，host=websocket握手header中的host，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，udp=是否在UDP中使用（需要节点支持），tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹
trojan2 = trojan,example.com,443,"password",transport=ws,path=/,host=micsoft.com,alpn=http1.1,skip-cert-verify=true,sni=example.com,udp=true

#trojan+http
# 节点名称 = 协议，服务器地址，端口，alpn=tls扩展，transport(传输方式)=http，path=httpheader中的path，host=httpheader的host，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，udp=是否在UDP中使用（需要节点支持）
trojan2 = trojan,example.com,443,"password",transport=ws,path=/,host=micsoft.com,alpn=http1.1,skip-cert-verify=true,sni=example.com,udp=true

#Wireguard
wireguardNode = wireguard,interface-ip=192.168.2.2,interface-ipV6=2402:4e00:1200:ed00:0:9089:6dac:96b6,private-key="qF22B3ezOhWGJA4SHwQSsgMa9d6mPGHyFdZMaDTae2E=",mtu=1280,dns=192.168.2.1,dnsV6=2402:4e00:1200:ed00:0:9089:6dac:96b6,keeyalive=45,peers=[{public-key="JFuTIJEcFnt8R04UnAE5o2WfIPJUsumSxsD2ayXzoWY=",preshared-key="yVNv5K05AwVnWaR4OB8BlMX3jJlkS74aKlYC3PD95IE=",reserved=[1,2,3],allowed-ips="0.0.0.0/0",endpoint=192.168.3.17:51820}],udp=true

#Hysteria2
# 节点名称 = 协议，服务器地址，端口，密码，skip-cert-verify=是否跳过证书校验（默认否），sni=SNI，tls-pubkey-sha256=服务器证书公钥的SHA256指纹，tls-cert-sha256=服务器证书的SHA256指纹，udp=是否在UDP中使用（需要节点支持），fast-open=是否开启fast open，salamander-password=salamander obfs的密码
hysteria2Node = Hysteria2,example.com,9898,"password",skip-cert-verify=true,sni=example.com,udp=true,fast-open=true，salamander-password=password,udp=true

#js custom
# 节点名称 = 协议，服务器地址，端口，script-path=脚本路径（本地脚本直接为文件名，远端脚本为url）
jsHTTP = custom,192.168.1.139,6152,script-path=http.js

除了可以解析官方定义的节点格式，Loon也可以解析大部分服务提供商所提供的订阅节点，如遇到不支持的情况可以使用节点订阅解析脚本进行解析，目前常用的解析脚本由SubStore提供，可在配置文件的general模块下进行如下配置，在之后的添加订阅节点页面开启解析器即可。
resource-parser = https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/backend/dist/sub-store-parser.loon.min.js

节点的TLS各参数说明
•	skip-cert-verify: 是否跳过证书验证，默认验证证书，Loon会验证服务端证书的以下几项 1.证书颁发机构是否来自系统默认信任的机构 2.证书是否过期 3.证书中的SNI是否与设定的相同；如果节点服务用的是自建证书，关闭此项或者将证书安装到iOS系统中，并进行信任
•	sni: TLS握手时会传递给服务端，不填写时使用代理服务器主机名作为SNI
•	tls-cert-sha256: 用于SSL pinning，可使用openssl生成，skip-cert-verify = false时有效，tls-pubkey-sha256有值时，此项无效
•	tls-pubkey-sha256: 用于SSL pinning，可使用openssl生成，skip-cert-verify = false时有效
//生成证书your-cert.pem的tls-cert-sha256
openssl x509 -noout -fingerprint -sha256 -inform pem -in your-cert.pem

/*
生成证书your-cert.pem的tls-pubkey-sha256
1. 从your-cert.pem中获取公钥server_pubkey.pem
2. 生成公钥的sha256指纹
*/
openssl x509 -pubkey -noout -in your-cert.pem > server_pubkey.pem

openssl pkey -pubin -in server_pubkey.pem -outform DER | openssl dgst -sha256


筛选节点
在App中添加了多个节点或者多个订阅节点后，如果需要将所有的节点进行分类时（比如需要将所有香港区域的节点进行分类，或者手动选择一些节点作为一个组），那么可以使用筛选节点功能。
支持的筛选方式
•	NodeSelect（手动选择需要组合的节点）
•	NameKeyword （根据节点名字中是否包含相关关键词进行筛选）
•	NameRegex （使用正则表达式对节点的名字进行筛选）
配置方式
在App中进行配置：进入配置页面 -> 点击筛选节点 -> 右上角添加 默认会将所有的节点进行筛选，可根据个人需求进行配置
正则筛选时常用的表达式
^.*(A|B)  =  A或者B
(A.*B|B.*A)  =  有A有B
^(?!.*A)    =   不含A 
^(?!.*?B).*A  =  有A但不含B
规则
节点（代理服务器）负责转发流量，规则决定使用哪个节点进行转发
匹配优先级
3.0.3版本后调整了一下匹配算法
•	由于一般将geoip的规则放在本地规则中，多个订阅规则中混合使用IP类型的规则，并且有部分IP类型的规则没有配置no-resolve，导致很多不必要的DNS查询，所以如果一个请求的目标地址是域名，会优先匹配域名类型的规则，若匹配到了域名类规则将不会再进行IP类规则匹配，若未匹配到域名类型的规则，则会在本地进行DNS查询，根据查询结果去匹配IP类规则；
•	除了域名和IP类型的规则有优先级，其他所有规则会按照配置文件中的顺序来决定优先级，即：排在前面的优先级高于排在后面的；同时本地规则 > 插件中的规则 > 订阅规则，未匹配到任何规则后会使用Final
域名类规则
DOMAIN
匹配整个域名
DOMAIN,google.com,proxy

DOMAIN-SUFFIX
匹配域名后缀，例如apple.com可以匹配icloud.apple.com，www.apple.com，但是不能够匹配app-apple.com
DOMAIN-SUFFIX,apple.com,proxy

DOMAIN-KEYWORD
域名关键词匹配
DOMAIN-KEYWORD,apple,proxy
IP类规则
IPV4
IP-CIDR,118.89.204.198/32,no-resolve

IPV6
IP-CIDR6,2402:4e00:1200:ed00:0:9089:6dac:96b6/128

GEOIP
根据mmdb查询的IP国家地区进行匹配
geoip,cn,DIRECT

IP-ASN
根据IP服务商进行匹配
IP-ASN,4134,DIRECT,no-resolve

no-resolve 可选: 当设置no-resolve后表示该规则只会对目标地址类型是IP类型的生效，域名类型的目标地址不会进行dns解析后再去匹配这个规则，为了防止域名类的目标地址做无效的DNS请求，请在给纯IP类型的域名制定的规则中加上no-resolve。

HTTP类规则
HTTP类型的规则只会对HTTP、HTTPS类型的请求进行匹配
URL-REGEX
根据提供的正则表达式对请求的url进行匹配
URL-REGEX,^http://google\.com,PROXY

USER-AGENT
根据请求header中的user-agent进行匹配，支持通配符
USER-AGENT,Apple*,DIRECT
端口规则
根据请求的源端口或者目标端口进行匹配（3.1.7+）
•	表示特定的某个端口，如DEST-PORT,443,DIRECT
•	表示端口闭区间，如DEST-PORT,80-443,DIRECT
•	使用>, <, <=, >= 表示一个无穷区间，如DEST-PORT,>=443,DIRECT
SRC-PORT
SRC-PORT,443,DIRECT
SRC-PORT,80-443,DIRECT
SRC-PORT,>=443,DIRECT

DEST-PORT
DEST-PORT,443,DIRECT
DEST-PORT,80-443,DIRECT
DEST-PORT,>=443,DIRECT
协议类规则
根据请求的协议类型进行匹配（3.1.7+），目前支持HTTP/HTTPS/TCP/QUIC/STUN/UDP
PROTOCOL
PROTOCOL,STUN,REJECT
逻辑规则
使用或、与、非逻辑将多个规则合并成一个规则（3.1.7+）
如果逻辑规则里面有域名有IP，尽量把IP的子规则放在后面，防止不必要的DNS查询
AND
多个子规则同时满足时才会匹配
AND,((子规则),(子规则)),PolicyName
AND,((DOMAIN-SUFFIX,axample),(DEST-PORT,443),(GEOIP,CN)),DIRECT

OR
子规则满足一个时匹配
OR,((子规则),(子规则)),PolicyName
OR,((DOMAIN-SUFFIX,axample),(DEST-PORT,443),(GEOIP,CN,no-resolve)),DIRECT

NOT
子规则不满足时匹配，只有有一个子规则
NOT,((子规则)),PolicyName
NOT,((AND,((DOMAIN-SUFFIX,axample),(DEST-PORT,443),(GEOIP,CN)))),DIRECT
Final
Final表示最后、兜底，即在没有匹配到配置的规则后，使用Final指定的策略
final,DIRECT
订阅规则
订阅规则是一系列规则的集合，只要是满足Loon类型的规则都可以放入规则集中。
https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Rule/ExampleRule.list, PROXY

查询性能
Loon目前可以承载数十万级别数量的规则，无须担心性能和耗时问题。同时也会采用LRU算法缓存近期的结果，命中结果的时间损耗接近为0ms。
下表为iPhone15 Pro Loon 3.2.0 build 712 上的测试情况，在app运行中的查询耗时可能受多线程等因素影响稍微有些波动，具体可以在请求记录的详情页面查看（build 712+）
规则类型	耗时	测试规则数量	测试订阅规则链接
DOMAIN,DOMAIN-SUFFIX	1ms内	20万	去广告(7.7万+) 去广告(12万+)

IP-CIDR	1ms内	10万	ChainIP(10万IPV4，4千IPV6)

IP-CIDR6	1-2ms	4千	ChainIP(10万IPV4，4千IPV6)

IPANS	1ms内	5千	中国大陆 ASN

DOMAIN,DOMAIN-SUFFIX,IP-CIDR,IP-CIDR6,GEOIP,IPASN,SRC-PORT,DEST-PORT,PROTOCOL类型的规则，查询耗时不会随着数量的增多而增多；DOMAIN-KEYWORD,USER-AGENT,URL-REGEX类型的规则会随着数量的增多而增加一些（5千+的DOMAIN-KEYWORD规则，查询耗时在10ms以内，USER-AGENT,URL-REGEX查询效率会随着相关表达式而波动，且测试数量较小暂时不做参考）；所以在选择规则类型时，尽量优先选择前面类型的规则。
策略
Loon的流量走向机制：
拿到手机的请求 -> 匹配规则 -> 查询规则指定的策略 -> 根据策略获取到相应的节点
上述流程阐述了规则、策略、节点三者的关系，规则指向策略，策略决定使用的节点
在Loon中，策略可以使以下三种：一个节点、内置策略、策略组
节点类型策略
当一个策略是一个节点时，就表示使用这个节点进行流程转发；你可以将规则直接指向一个节点策略，如：
# 你有一个节点名字叫‘香港01’
DOMAIN,google.com,香港01

内置策略
内置策略分为两种类型，直连和拒绝
直连
流量不经过任何代理服务器，直接发送到目的地，使用大写的DIRECT表示
DOMAIN,apple.com,DIRECT

拒绝
顾名思义就是不将流量发送到任何服务器，一般用于去广告
为了更好的适应不同类型的请求，Loon提供了以下几种拒绝策略
•	REJECT (返回404和空响应体)
•	REJECT-IMG (返回200和一个 1px GIF 的响应体)
•	REJECT-DICT (返回200和内容为空的 JSON 的响应体)
•	REJECT-ARRY (返回200和一个内容为空的 JSON 数组)
•	REJECT-DROP (拒绝并丢弃请求，且不会返回任何响应。因为部分程序有着十分暴力的重试逻辑，连接失败后会立刻进行重试，导致请求风暴)
策略组
策略组是一系列策略、策略组的集合，手动或自动的决定使用策略组中的哪一个策略，可以在配置文件的[Proxy Group]模块下声明，策略组是可以相互嵌套的
select 策略组
该类型的测录组是手动类型，需要你在策略页面进行手动选择要使用的策略
url-test 策略组
根据提供的url，每隔一段时间对该策略组下的所有节点进行测速，选择最快的一个节点使用
可配置的参数：
•	url：测速的url，loon会向该url发起header请求
•	interval：测速间隔时间，单位秒
•	tolerance：容差，如果当前测速后的最优节点和之前最优节点的测速相差小于tolerance，将不会进行节点切换，单位毫秒
fallback
根据提供的url，每隔一段时间对该策略组下的所有节点进行测速，选择第一个可用的节点使用
可配置参数
•	url：测速的url，loon会向该url发起header请求
•	interval：测速间隔时间，单位秒
•	max-timeout：最大超时时间，如果一个节点测速超过了这个值，就将该节点认作为不可用节点，不会进行排序，单位毫秒
load-balance
负载均衡，根据所选的负载均衡算法，自动选择子策略
可配置参数
•	url：测速的url，loon会向该url发起header请求
•	interval：测速间隔时间，单位秒
•	max-timeout：最大超时时间，如果一个节点测速超过了这个值，就将该节点认作为不可用节点，不会进行排序，单位毫秒
•	algorithm：负载均衡算法
o	Random：随机选择子策略
o	PCC：基于Random，不同于Random，PCC会让相同主机名的请求锁定同一节点
o	Round-Robin：轮询选择子策略
复写
复写是专门用来处理HTTP/S类型的请求，在请求未发出前和获取响应后，根据所设定的复写类型来修改请求数据，可修改请求的URL、Header、Body以及响应的Header、Body，所有的复写仅在http请求或者经过解密后的https请求中有效
复写的处理会在规则匹配之前
匹配优先级
和规则的优先级一样，本地配置文件中的复写 > 插件中的复写，相同文件中的复写，优先级自上而下越来越低。
多次匹配
Loon的复写对一个HTTP/S的两侧进行作用，请求侧和响应侧，两侧复写会分别进行匹配，请求侧和响应侧复写可以作用于同一个HTTP/S中。从3.2.3（749）开始多个同一侧的复写可以作用于一个HTTP/S中，前提是多个同侧复写的正则表达式要一致，如果使用不同的正则表达式却可以匹配同一个url，那优先级高的那个复写才会起作用，所以如果要多个同侧复写作用于一个HTTP/S，请使用相同的正则表达式进行匹配。
多次匹配注意事项
•	不同侧的复写可以同时匹配一个HTTP/S
•	多个同侧复写匹配时，采用的修改方式是叠加修改，即第一个复写修改的输出作为第二个修改的输入，所以如果修改的内容相同，后面的会覆盖前面的修改
URL 类型复写
此类复写会修改请求的URL
^http://www\.google\.cn header http://www.google.com

直接响应类复写
此类复写直接返回一个code位30x的重定向response
302
^http://example.com 302 https://example.com

307
^http://example.com 307 https://example.com

reject
1.	reject: 直接断开连接
2.	reject-200: 返回一个code为200，body内容为空的response
3.	reject_img: 返回一个code为200，body内容一像素图片的的response
4.	reject_dict: 返回一个code为200，body内容为"{}"的空json对象字符串
5.	reject_array: 返回一个code为200，body内容为"[]"的空json数组字符串
 ^http://example.com reject
 ^http://example.com reject-200
 ^http://example.com reject-img
 ^http://example.com reject-dict
 ^http://example.com reject-array

Request Header 类型复写
此类复写会修改请求的Header
 ^http://example.com header-add Connection keep-alive
 ^http://example.com header-del Cookie
 ^http://example.com header-replace User-Agent Unknown
 ^http://example.com header-replace-regex User-Agent regex replace-value //替换User-Agent的值被正则regex匹配到的内容

注意：由于在解析配置是用空格分割各个参数，如果配置的参数中有空格，请使用\x20代替
从3.2.1(build 730)开始，可以给一个Request Header类型的Rewrite设置修改多个值，如：
 ^http://example.com header-add Connection keep-alive Proxy-Connection keep-alive //header中添加Connection:keep-alive和Proxy-Connection:keep-alive
 ^http://example.com header-del Cookie Connection
 ^http://example.com header-replace User-Agent Unknown Content-Length 1999 Content-Type application/json
 ^http://example.com header-replace-regex User-Agent regex replace-value Cookie UUID=123 UUID=456

Request Body 类型复写 (build 729+)
此类复写会修改请求体
^http://example.com request-body-replace-regex regex1 replace-value1 regex2 replace-value2
^http://example.com request-body-json-add data.apps[0] {"appName":"loon","appVersion":"3.2.1"} data.category tool
^http://example.com request-body-json-replace data.ad {}
^http://example.com request-body-json-del data.ad
^http://example.com request-body-json-jq 'del(.data.ad)'

request-body-json-xxx 类型的复写只有当请求体是Json格式时才会有效，提供一个定位到要处理的json对象的keypath即可添加、删除、替换相关json对象，keypath采用点分式，如 data.apps[0].appname,[0]表示数组第一个对象，如果keypath无法定位到json对象的子对象，或者数组越界，keypath无效。request-body-json-jq 使用jq表达式来修改json数据，使用单引号包裹jq表达式，jq语法详见：https://jqlang.github.io/jq/tutorial/
Mock Request Body
此类复写使用一个假数据模拟 Http request body
^http://example.com mock-request-body data-type=text data="" 
^http://example.com mock-request-body data-type=json data-path=request_body.json
^http://example.com mock-request-body data-type=png data-path=request_body.raw mock-data-is-base64=true

•	data-type: body的类型，json,text,css,html,javascript,plain,png,gif,jpeg,tiff,svg,mp4,form-data
•	data: body的值，用双引号包裹，由于data会加载到内存中，建议采用data-path的方式配置中大型的Mock Data
•	data-path: body的文件路径，用双引号包裹，可以是url，也可以是iCloud/Mock路径下的文件全名
•	mock-data-is-base64：如果data或者data-path提供的数据是二进制的base64字符串，设置此配置为true
Response Header 类型复写 (build 729+)
此类复写会修改响应的Header
 ^http://example.com response-header-add Connection keep-alive
 ^http://example.com response-header-del Cookie
 ^http://example.com response-header-replace User-Agent Unknown
 ^http://example.com response-header-replace-regex User-Agent regex replace-value

同Reqeust Header，从3.2.1(build 730)开始可以配置多个key-value修改Response Header
Response Body 类型复写 (build 729+)
此类复写会修改响应体
^http://example.com response-body-replace-regex regex1 replace-value1 regex2 replace-value2
^http://example.com response-body-json-add data.apps[0] {"appName":"loon","appVersion":"3.2.1"} data.category tool
^http://example.com response-body-json-replace data.ad {}
^http://example.com response-body-json-del data.ad
^http://example.com response-body-json-jq 'del(.data.ad)'

response-body-json-xxx 类型的复写只有当响应体是Json格式时才会有效，提供一个定位到需要处理的json对象的keypath即可添加、删除、替换相关json对象，keypath采用点分式，如 data.apps[0].appname,[0]表示数组第一个对象，如果keypath无法定位到json对象的子对象，或者数组越界，keypath无效。response-body-json-jq 使用jq表达式来修改json数据，使用单引号包裹jq表达式，jq语法详见：https://jqlang.github.io/jq/tutorial/
Mock Response Body
此类复写立即返回一个 Http response body
^http://example.com mock-response-body data-type=text data="" status-code=200
^http://example.com mock-response-body data-type=json data-path=response_body.json status-code=200
^http://example.com mock-response-body data-type=svg data-path=response_body.raw mock-data-is-base64=true status-code=200

•	data-type: body的类型，json,text,css,html,javascript,plain,png,gif,jpeg,tiff,svg,mp4,form-data
•	data: body的值，用双引号包裹，由于data会加载到内存中，建议采用data-path的方式配置中大型的Mock Data
•	data-path: body的文件路径，用双引号包裹，可以是url，也可以是iClcoud/Mock路径下的文件全名
•	status-code: Http response status code
•	mock-data-is-base64：如果data或者data-path提供的数据是二进制的base64字符串，设置此配置为true
•	status-code: Http response status code
⚠️⚠️⚠️注意⚠️⚠️⚠️
如果正则表达式或者替换的内容包含空格，请使用\x20表示，否则rewrite配置会解析异常
如果正则表达式或者替换的内容包含空格，请使用\x20表示，否则rewrite配置会解析异常
DNS
Loon（截止Build 427）支持四种DNS查询，
•	标准UDP查询
•	DNS-over-HTTPS
•	DNS-over-QUIC
•	DNS-over—HTTP3
相关配置
[General]
# dns服务，system表示系统自带dns服务器
dns-server = system,119.29.29.29,223.5.5.5
# DoH server，标准的url格式，以,分割多个地址
doh-server = https://example.com/dns-query
# DoQ server，以quic://开头，以,分割多个地址，默认端口784
doq-server = quic://example.com:784
# DoH3 server，标准的url格式，以,分割多个地址
doh3-server = h3://example.com/dns-query

DNS查询逻辑
Loon将所有DNS查询分为两类，第一类是常规DNS查询，第二类是加密DNS查询（DoH/DoQ/DoH3），在同时配置了加密DNS和常规DNS服务器时，只会进行加密DNS查询，会并发向所有有效的DNS服务器发起查询，使用响应最快的查询结果。
DNS缓存
 采用LRU算法缓存100条数据（iOS15后增加到200），在Loon启动过程中有效，关闭后缓存全部清除；
DNS查询、缓存命中逻辑
在对一个域名进行查询前，会在内存缓存中查询，如果命中缓存，会直接使用缓存结果，如果缓存IP的TTL过期，会进行一次查询，并使用查询结果更新缓存。 如果没有缓存，会根据配置的DNS服务器并发查询，使用最先响应的结果，并更新缓存。
查询回落
在使用加密的DNS查询IP时，如果查询失败将会使用常规的DNS进行查询，可以在App的DNS服务器页面进行关闭
DNS映射
当需要对特定域名指定DNS服务或者固定IP时，可以使用此功能，目前支持以下几种模式：
•	域名映射域名，将一个域名转为另一个域名进行请求
•	域名映射IP，直接指定域名使用此IP进行请求
•	域名指定查询DNS服务器，指定该域名使用此处的DNS服务器进行DNS查询
•	特定SSID环境下指定DNS查询的服务器
•	域名指定IP模式，目前可选的IP模式：ipv4-ony,dual,ipv4-preferred,ipv6-preferred，具体参数作用可见【General->ip-mode】
相关配置示例：
example.com = 192.168.1.20
example.com = example.com.cn
*.testflight.apple.com = server:8.8.4.4
// system表示系统DNS 服务器
*.apple.com = server:system
ssid:LOON's WIFI = server:system
ssid:LOON WIFI = server:https://example.com/dns-query
example.com = ip-mode:ipv4-ony
该部分主要包含配置文件中 [general]模块下的参数解释
bypass-tun
目前iOS设备上的流量有两种方式传递给Loon，分别是HTTP Proxy和TUN（可以简单理解为虚拟网卡），bypass-tun则和TUN有关，如果配置了该参数，那么所配置的这些IP段、域名就会不交给Loon来处理，系统直接处理
bypass-tun = 192.168.0.0/16,localhost,*.local

skip-proxy
和上面类似，skip-proxy则和HTTP Proxy有关，如果配置了该参数，那么所配置的这些IP段、域名将不会转发到Loon，而是由系统处理
skip-proxy = 192.168.0.0/16

dns-server
udp类的dns服务器，用,隔开多个服务器，system表示系统dns
dns-server = system,1.1.1.1

doh-server
DNS over HTTPS服务器，用,隔开多个服务器
doh-server = https://doh.dns.apple.com/dns-query

doq-server
DNS over QUIC服务器，用,隔开多个服务器，默认端口784
doh-server = quic://example.com, quic://example2.com

doh3-server
DNS over HTTPS服务器，用,隔开多个服务器
doh3-server = h3://223.6.6.6/dns-query

ipv6
3.2.3+ build(754) 开始弃用

ip-mode
3.2.3+ build(754)
目前支持以下类型
•	ipv4-only: 只使用 IPv4 进行请求，不发起 AAAA 的 DNS 查询，拒绝所有 IPv6 连接
•	dual: 并发发起 A 和 AAAA 的 DNS 查询，优先使用响应速度更快的结果，不判断是否是IPv4或者IPv6
•	ipv4-preferred: 并发发起 A 和 AAAA 的 DNS 查询，优先使用 IPv6 结果，如无 IPv6 记录则切换到 IPv4 结果
•	ipv6-Preferred: 并发发起 A 和 AAAA 的 DNS 查询，优先使用 IPv4 结果，如无 IPv4 记录则切换到 IPv6 结果
ip-mode = dual

allow-wifi-access
是否开启局域网代理访问
allow-wifi-access = true

wifi-access-http-port
开启局域网访问后的http代理端口
wifi-access-http-port = 8899

wifi-access-socks5-port
开启局域网访问后的socks5代理端口
wifi-access-socks5-port = 8898

proxy-test-url
测速所用的测试链接，如果策略组没有自定义测试链接就会使用这里配置的
proxy-test-url = http://cp.cloudflare.com/generate_204

internet-test-url
检测网络可用性时的链接，一般填写可以直连访问的链接
internet-test-url = http://wifi.vivo.com.cn/generate_204

test-timeout
节点测速时的超时秒数
test-timeout = 5

switch-node-after-failure-times
一个节点连接失败几次后会进行节点切换，默认3次
switch-node-after-failure-times = 2

resource-parser
订阅资源解析器链接，推荐Peng大的sub-store订阅节点解析器
resource-parser = https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store-parser.loon.min.js

ssid-trigger
当切换到某一特定的WiFi下时改变Loon的流量模式，如"loon-wifi5g":DIRECT，表示在loon-wifi5g这个wifi网络下使用直连模式，"cellular":PROXY，表示在蜂窝网络下使用代理模式，"default":RULE，默认使用分流模式
ssid-trigger = "loon-wifi5g":DIRECT,"cellular":PROXY,"default":RULE

real-ip
有些app会自己去请求DNS获取IP，这样导致有些域名类型的规则无法进行匹配，所以Loon是用了FakeIP来解决这个问题，原理是截取这些DNS请求，返回一个假的IP响应，然后在获取到这个假的IP的请求时将相关域名映射到请求中；但是有时候系统的一些域名会缓存这些假IP，导致关闭Loon后会用这个假的IP直接发起请求，这就会导致一些问题，针对这种情况可以配置real-ip来使这些域名返回真实的ip
real-ip = *.apple.com,*.icloud.com

hijack-dns
3.2.5 (build 789+)
有些app会自己使用自定义的DNS over UDP来解析IP，可以配置相关IP:端口来劫持这些查询，并返回fakeip的响应
// *:53 表示所有53端口
// *:0 所有
// 8.8.8.8 所有8.8.8.8的查询
hijack-dns = *:53,8.8.8.8

interface-mode
指定流量使用哪个网络接口进行转发，目前包含三种模式:
•	Auto: 系统自动分配
•	Cellular: 在WiFi和蜂窝数据都开启的情况下指定使用蜂窝网络
•	Performace: 在WiFi和蜂窝数据都开启的情况下使用最优的网络接口
•	Balance: 在WiFi和蜂窝数据都开启的情况下，均衡使用网络接口
interface-mode = Performace

force-http-engine-hosts
3.2.3+ build(787) 开始弃用

# :8080，表示解析所有8080端口，0表示解析所有端口
# 通配符域名，解析所有端口下的相关域名
force-http-engine-hosts = *.baid.com,:8080

disable-udp-ports
禁用udp协议的一些端口
disable-udp-ports = 443,80

disable-stun
禁用stun是否禁用stun协议的udp数据，禁用后可以有效解决webrtc的ip泄露
disable-stun = true

geoip-url
自定义geoip数据库的下载地址
ipasn-url
3.2.3+ build(754) 自定义asn数据库的下载地址
udp-fallback-mode
3.2.0+ build(702)
当UDP的流量规则匹配到相关节点，但该节点不支持UDP或未未开启UDP转发时使用的策略，可选DIRECT、REJECT
udp-fallback-mode = REJECT

domain-reject-mode
3.2.0+ build(702)
域名拒绝规则执行的阶段
•	DNS：使用 LoopbackIP、No Answer 或 NXDomain 的方式阻止 DNS 查询以达到拦截请求的目的
•	Request：在请求转发阶段拦截请求
⚠️ 在 HTTP Proxy & TUN 模式下由于拦截到的系统 DNS 较少，大部分的拦截都会在转发请求阶段进行。
domain-reject-mode = DNS

dns-reject-mode
3.2.0+ build(702)
在DNS阶段拒绝域名时采用的方式
•	LOOPBACKIP：回环IP
•	NOANSWER：DNS响应为空
•	NXDOMAIN：错误码为3的DNS响应
dns-reject-mode = LOOPBACKIP

