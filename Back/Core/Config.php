<?php
	/**
	 * Arquivo de configuração da aplicação que está 
	 *
	 * @package    config
	 * @author     Alexandre Farinelli Zardo
	*/

	/**
	 * SYSTEM NAME
	 * 
	 * O nome do sistem que está rodando sob o framework. Este nome será utilizado
	 * na tag <title> caso você utilize a função head() da classe helper html.
	 * 
	*/
	$config['system_name'] = '.::. LABORATÓRIO .::.';
	$config['system_apelido'] = 'Laboratório';

	/**
	 * TIME AND DATE 
	 * 
	 * Define quais serão os formatos que serão utilizado para
	 * data e hora.
	 * 
	 * @date_format - o formato de data
	 * @time_format - o formato de hora
	 * @time_zone   - o fuso horário utilizado
	 * 
	*/
	$config['date_format'] = 'd/m/Y';
	$config['time_format'] = 'H:i:s';
	$config['time_zone'  ] = 'America/Sao_Paulo';


	/**
	 * SESSIONS
	 * 
	 * Define as configurações padrão das sessões que serão utilizadas pela
	 * aplicação.
	 * 
	 * @sess_name         - o nome do grupo da sessão.
	 * @sess_cache_expire - especifíca o time-to-live para páginas de sessão em minutos.
	 * @sess_regenerate - regenerar a sessão.
	 * @sess_cookie_params - especifíca o tempo em segundos da limpeza de lixo.
	*/
	$config['sess_name'         ] = 'LABORATORIO';
	$config['sess_cache_expire' ] = 200; // em minutos. false = 180(padrao)
	$config['sess_regenerate'   ] = false;
	$config['sess_cookie_params'] = 7200; // em segundos. false = padrão do php


	/**
	 * MONEY 
	 * 
	 * Configura como será tratado os formatos monetários
	 * da aplicação.
	 * 
	 * @money_decimals  - quantas casas decimais um valor terá.
	 * @money_thousend  - o caracter que separa os valores de milhar.
	 * @money_dec_point - o caracter que separa os valores decimais.
	*/
	$config['money_decimals' ] = 2;
	$config['money_thousend' ] = '.';
	$config['money_dec_point'] = ',';

	/**
	 * CHARSET
	 * 
	 * Define o charset que será utilizado 
	 * pela aplicação.
	 *  
	*/
	$config['charset'] = 'UTF-8';

	/**
	 *PARAMETROS BANCO DE DADOS
	 * 
	 * Defini informações de Acesso
	 * ao banco de dados
	 *  
	*/
	$config['drive'] = 'mysql:host=';
	$config['servidor'] = 'localhost';
	$config['banco'] = ';dbname=laboratorio';
	$config['charsetbanco'] = ';charset=utf8';
	$config['usuario'] = 'root';
	$config['senha'] = '';
	//$config['senha'] = 'Zardo!q@w#e$r';
	//$config['senha'] = 'tk@maria!1441';

	/**
	 *PARAMETROS DE CODIFICAÇÃO DE ERROS DO SISTEMA
	 * 
	 * Padroniza os código de erros do sistema
	 *  
	*/
	$config['100'] = 'Erro nas Configurações do Sistema';
	$config['101'] = 'Erro de Acesso ao Sistema';
	$config['102'] = 'Erro Carregamento do Sistema';
	$config['103'] = 'Erro de Banco de Dados do Sistema';
?>