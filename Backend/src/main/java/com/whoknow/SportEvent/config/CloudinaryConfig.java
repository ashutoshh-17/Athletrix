package com.whoknow.SportEvent.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "di6jg0h3n",
                "api_key", "515662926691171",
                "api_secret", "JDVw8tqzTYk4tcTjzERcJzpf0yQ"
        ));
    }
}

