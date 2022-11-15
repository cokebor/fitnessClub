package com.fitness.auth;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableResourceServer
public class ResourceServerConfigurerAdapter extends org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter{
	
	//Damos permisos
	@Override
	public void configure(HttpSecurity http) throws Exception {
		//Indicamos que esta pagina tiene acceso cualquier usuario
	    http.authorizeRequests().antMatchers(HttpMethod.GET,"/api/usuarios/**","/api/paises/**","/api/**","/api/uploads/img/**","/images/**").permitAll()
		.antMatchers(HttpMethod.POST,"/api/**").permitAll()
		.antMatchers(HttpMethod.PUT,"/api/**").permitAll()
		.antMatchers(HttpMethod.DELETE,"/api/**").permitAll()
		.antMatchers(HttpMethod.GET,"/api/**").permitAll()
		/*.antMatchers(HttpMethod.GET,"/api/clientes/{id}").hasAnyRole("USER","ADMIN")
		.antMatchers(HttpMethod.POST,"/api/clientes/upload").hasAnyRole("USER","ADMIN")
		.antMatchers(HttpMethod.POST,"/api/clientes").hasRole("ADMIN")
		.antMatchers("/api/clientes/**").hasRole("ADMIN")*/
		
		//Aca indicamos que las de mas paginas necesitan autenticacion
		.anyRequest().authenticated()
		.and().cors().configurationSource(corsConfigurationSource());
	}
	
	//permisos para el intercambio de recursos
	   @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
	        configuration.setAllowCredentials(true);
	        configuration.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
	        
	        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        
	        return source;
	    }
	    
	    @Bean
	    public FilterRegistrationBean<CorsFilter> corsFilter(){
	        FilterRegistrationBean<CorsFilter> bean=new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
	        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
	        return bean;
	    }
}
