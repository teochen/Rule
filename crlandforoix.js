function main(config) {

  config.dns = config.dns || {};

  const oldPolicy = config.dns["nameserver-policy"] || {};

  config.dns["nameserver-policy"] = {
    ...oldPolicy,

    "+.crland.hk": ["10.93.175.250:53","10.0.128.15:53"],
    "+.crc.com.cn": ["10.93.175.250:53","10.0.128.15:53"],
    "+.crland.cn": ["10.93.175.250:53","10.0.128.15:53"],
    "+.crland.com.cn": ["10.93.175.250:53","10.0.128.15:53"],
    "+.crcloud.com": ["10.93.175.250:53","10.0.128.15:53"]
  };

  config.rules = config.rules || [];

  config.rules.unshift(
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "DOMAIN-SUFFIX,crland.hk,DIRECT",
    "DOMAIN-SUFFIX,crc.com.cn,DIRECT",
    "DOMAIN-SUFFIX,crland.cn,DIRECT",
    "DOMAIN-SUFFIX,crland.com.cn,DIRECT",
    "DOMAIN-SUFFIX,crcloud.com,DIRECT"
  );

  return config;
}
