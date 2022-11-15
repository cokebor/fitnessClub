package com.fitness.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;



@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter{
	
	@Autowired //Se puede inyectar ya que es un Bean
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authenticationManager;
	
	   @Autowired
	    private InfoAdicionalToken infoAdicionalToken;
	
	//Aca configuramos los permisos de nuestros endpoint(rutas de acceso)
	@Override
	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
		//damos el permiso a cualquier usuario para autenticarse
		security.tokenKeyAccess("permitAll()")
		//Damos permiso para validar el Token
		.checkTokenAccess("isAuthenticated()");
	}

	//configuramos los clientes, las aplicaciones que van a acceder a la api rest
	// en este caso solo de angular
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		// inMemory es el tipo de almacenamiento
		//en withClient indicamos el nombre de la api y la contraseña
		clients.inMemory().withClient("angularapp")
		//con passwordEncoder encriptamos la contrase;a
		.secret(passwordEncoder.encode("12345"))
		//permisos(alcance)
		.scopes("read", "write")
		//Aca ponemos el tipo de autenticacion, como es con Credenciales usamos el tipo password
		//refresh_token nos permite obtener un token de acceso
		.authorizedGrantTypes("password", "refresh_token")
		// Tiempo de caducidad del token 3600=1hr
		.accessTokenValiditySeconds(3600)
		//Timpo de expiracion del refresh token
		.refreshTokenValiditySeconds(3600);
	}
//En este metodo configuramos el Endpoint del AuthorizationServer
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
	    
		TokenEnhancerChain tokenEnhancerChain=new TokenEnhancerChain();
		tokenEnhancerChain.setTokenEnhancers(Arrays.asList(infoAdicionalToken,accessTokenConverter()));
		
		//configuramos el authenticationManager mediante el endpoint
		endpoints.authenticationManager(authenticationManager)
		// Este es opcional
		.tokenStore(tokenStore())
		//registramos el accessTokenConverter q se encarga de administrar el token, almacena la informacionq queremos agregar
		.accessTokenConverter(accessTokenConverter())
		//Asignamos la cadena
		.tokenEnhancer(tokenEnhancerChain);
	}
	
	@Bean //Crea componente de Spring con Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
		//Firmamos
		jwtAccessTokenConverter.setSigningKey(JwtConfig.RSA_PRIVADA);
		//Valida que token sea autentico
		jwtAccessTokenConverter.setVerifierKey(JwtConfig.RSA_PUBLICA);
		return jwtAccessTokenConverter;
	}
	
	@Bean
	public JwtTokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	} 
}
