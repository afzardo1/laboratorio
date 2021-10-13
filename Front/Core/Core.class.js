/*CARREGA MOMENTE.JS PARA CLASSE PRINCIPAL OD SISTEMA*/
import '../Dependencias/moment/locale/pt-br.js';
import moment from '../Dependencias/moment/moment.js';

/*CARREGA JQUERY.MASK.JS PARA CLASSE PRINCIPAL OD SISTEMA*/
import '../Dependencias/validocu/jquery.mask.js';

/*CARREGA JQUERY.CPFCNPJ.JS PARA CLASSE PRINCIPAL OD SISTEMA*/
//import '../Dependencias/validocu/jquery.cpfcnpj.js';

/*CARREGA CLASSE LOGIN DO SISTEMA*/
import Login from './login.class.js';

/*CARREGA CLASSE MENU DO SISTEMA*/
import Menu from './menu.class.js';

/*CARREGA CLASSE USUARIOS DO SISTEMA*/
import Usuarios from './usuarios.class.js';

/*CARREGA CLASSE TENANT DO SISTEMA*/
import Tenant from './tenant.class.js';

/*CARREGA CLASSE EMPRESAS DO SISTEMA*/
import Empresas from './empresas.class.js';

/*CARREGA CLASSE CLIENTES DO SISTEMA*/
import Clientes from './clientes.class.js';

/*CARREGA CLASSE FABRICANTES DO SISTEMA*/
import Fabricantes from './fabricantes.class.js';

/*CARREGA CLASSE MATERIAIS DO SISTEMA*/
import Materiais from './materiais.class.js';

/*CARREGA CLASSE MATERIAIS DO SISTEMA*/
import Areas from './areas.class.js';

/*CARREGA CLASSE AMOSTRAS DO SISTEMA*/
import Amostras from './amostras.class.js';

/*CARREGA CLASSE ANEXOS DO SISTEMA*/
import Anexos from './anexos.class.js';

/*CARREGA CLASSE ACHATAMENTO DO SISTEMA*/
import Achatamento from './achatamento.class.js';

/*CARREGA CLASSE DOBRAMENTO DO SISTEMA*/
import Dobramento from './dobramento.class.js';

/*CARREGA CLASSE DUREZA DO SISTEMA*/
import Dureza from './dureza.class.js';

/*CARREGA CLASSE CHARPY DO SISTEMA*/
import Charpy from './charpy.class.js';

/*CARREGA CLASSE MACROGRAFIA DO SISTEMA*/
import Macrografia from './macrografia.class.js';

/*CARREGA CLASSE AMOSTRAS DO SISTEMA*/
import Metalografia from './metalografia.class.js';

/*CARREGA CLASSE PCEND DO SISTEMA*/
import Pcend from './pcend.class.js';

/**
 * Esta classe é a mais importante da API.
 * Todas as requisições passam por aqui, são tratadas
 * e redirecionadas para o seu destino.
 *
 * @package    Core
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Core {
	LoadMenu = '';
	MensMenu = '';

	/**
	 * Carrega modal de timer do carregando
	 * 
	 * @return null
	 * @access public
	*/	
	static SetLoadMenu(){
		this.LoadMenu = new bootstrap.Modal( '#LoadMenu', { keyboard: false, backdrop: 'static' } )
	}

	/**
	 * Carrega modal de mensagens do sistema
	 * 
	 * @return null
	 * @access public
	*/	
	static SetMensMenu( vTitulo, vMensagem, vTipo){
		$( '#MensMenu' ).find( '#TitleMensMenu' ).html( vTitulo );
		$( '#MensMenu' ).find( '#MensMensMenu' ).html( vMensagem );
		if ( vTipo == 'AVISO' ){
			$( '#MensMenu' ).find( '#SimMensMenu' ).hide();
			$( '#MensMenu' ).find( '#NaoMensMenu' ).html( 'Ok' );
		} else {
			$( '#MensMenu' ).find( '#SimMensMenu' ).show();
			$( '#MensMenu' ).find( '#NaoMensMenu' ).html( 'Não' );
		};
		this.MensMenu = new bootstrap.Modal( '#MensMenu', { keyboard: false, backdrop: 'static' } )
	}

	/**
	 * Limpa todas as variaveis da sessao
	 * 
	 * @return boolean
	 * @access public
	*/	
	static FinalSess(){
		sessionStorage.clear();
		return true;
	}
    
    /**
	 * Método implementado para retornar
	 * Objeto Pai quando soliciatado
	 * 
	 * @param  $vObjtFilho - Objeto Filho
	 * @param  $vObjtPai   - Array Objeto Pai
	 * @return Objeto Pai
	 * @access public
	*/
    static GetObjtPai( vObjtFilho, vObjtPai, callback ) {
        $( vObjtFilho ).parents().map( function() {
          	if ( $.inArray( this.id, vObjtPai ) !== -1 ) {
            	callback ( this );
        	};
    	})
	};
   
    /**
	 * Método implementado validar campos nos formularios
	 * 
	 * 
	 * @param  $vObjtPai - Objeto pai ou formulario
	 * @param  $vValor   - Valor a ser validado
	 * @param  $vTagVali - Tag que sera usada para valifar
	 * @return Objeto invalido
	 * @access public
	*/
    static GetCampObri( vObjtPai, vValor, vTagVali = '[data-obriga="S"]', callback ) {
		$( vObjtPai ).find( vTagVali ).each( function( index ) {
			if ( vValor.indexOf( $( this ).val() ) != -1 ) {
				callback ( $( this ) );
				return false;
			} else {
				if ( index == ( $( vObjtPai ).find( vTagVali ).length - 1 ) ) {
					callback ( 'validado' );
				};
			};
        });
    };

    /**
	 * Método implementado para request 
	 * padrao usando ajax
	 * 
	 * 
	 * @param  vParaData - Paramentros de POST
	 * @param  vUrl - Caminho url
	 * @param  vResp - Calback
	 * @return callback
	 * @access public
	*/
	static SetAjax( vParaData, vUrl, vResp ) {
		$.ajax ({
			type: 'POST',
			url: vUrl,
			dataType: 'json',
			async: true,
			data: vParaData,
			cache: false,
			success: function ( vRespBack ) {
				if ( vRespBack.status == 'expirado' ){
					Core.Menu.GetMenuSair();
				};
				var vStatus = '';
				var vDestalhes = '';
				var vRegistros = '';
				if ( vRespBack.code >= 100 ){
					vStatus = 'erro';
					vDestalhes = 'Erro no servidor. </br> ' +
						'Status: Codigo erro - ' + vRespBack.code + ' - ' + vRespBack.type + '</br> ' +
						'Descrição: ' + vRespBack.message + '</br> ' +
					  	'Detalhes: Arquivo - ' + vRespBack.file + ' - Linha: ' + vRespBack.line + '</br>';
				} else {
					vStatus = vRespBack.status;
					vDestalhes = vRespBack.descricao;
					vRegistros = vRespBack.listreg;
				};
				vResp ({
					sistema: vRespBack.sistema,
					modulo: vRespBack.modulo ,
					status: vStatus,
					detalhes: vDestalhes,
					registros: vRegistros
				});
			},
			error: function ( request, status, erro) {
				vResp ({
					sistema: 'sistema',
					modulo: '',
					status: 'erro',
					detalhes: 'Erro na Comunicação. </br> ' +
						'Status: ' + status + ' - ' + request.status + ' - ' + request.statusText + '</br> ' +
						'Descrição: ' + erro + '</br> ' +
						'Detalhes: ' + request.responseText + '</br>',
					registros: '',
				});
			}
		});
    };

	/**
	 * Método implementado para request 
	 * padrao usando ajax
	 * 
	 * 
	 * @param  vElement - Select que sera alterado
	 * @param  vUrl - Caminho url
	 * @param  vResp - Calback
	 * @return callback
	 * @access public
	*/
	static SetSele2( vElement, vData, vResp ) {
		var vOpti = {
			language: 'pt-BR',
			theme: 'bootstrap-5',
			data: [{ id: 0, text: 'SELECIONE UMA OPÇÃO' }],
		};
		if ( vData != '' ){
			var array1 = [{ id: 0, text: 'SELECIONE UMA OPÇÃO' }];
			vData = array1.concat( vData );
			vOpti = {
				data: vData,
				language: 'pt-BR',
				theme: 'bootstrap-5'
			};
		};
		$( vElement ).html('');
		$( vElement ).select2( vOpti );
		vResp( 'concluido' );
	};
	
	/**
	 * Método para checar e validar e-mail
	 * 
	 * @param  vEmail - Email para validar
	 * @return boolean
	 * @access public
	*/
	static GetValiEmail( vEmail ) {
		const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return emailRegex.test( String( vEmail ).toLowerCase() );
	}
	
	/**
	 * Método de Checa de CNPJ na receita Federal
	 * 
	 * @param  vDocu - CNPJ ou CPF a ser Validado
	 * @return vResp - array com os dados
	 * @access public
	*/
	static ChkValDoc( vDocu, vResp ){
		$.ajax ({
			type: 'GET',
			url: 'https://www.receitaws.com.br/v1/cnpj/' + vDocu,
			dataType: 'jsonp',
			async: true,
			cache: false,
			success: function ( vRespBack ) {
				if (  vRespBack.status != 'ERROR' ) {
					vResp ({
						sistema: 'sistema',
						modulo: 'valida documento',
						status: 'sucesso',
						detalhes: 'CNPJ válido',
						registros: vRespBack
					});
				} else {
					vResp ({
						sistema: 'sistema',
						modulo: 'valida documento',
						status: 'erro',
						detalhes: vRespBack.message,
						registros: ''
					});
				};
			},
			error: function ( request, status, erro) {
				vResp ({
					sistema: 'sistema',
					modulo: 'valida documento',
					status: 'erro',
					detalhes: 'Erro na Comunicação. </br> ' +
						'Status: ' + status + ' - ' + request.status + ' - ' + request.statusText + '</br> ' +
						'Descrição: ' + erro + '</br> ' +
						'Detalhes: ' + request.responseText + '</br>',
					registros: '',
				});
			}
		});
	}

	/**
	 * Método Validar CNPJ e CPF
	 * 
	 * @param  vDocu - CNPJ ou CPF a ser Validado
	 * @access public
	*/
	static ValiDocu( vDocu ){
		$( vDocu ).cpfcnpj({
			mask: true,
			validate: 'cpfcnpj',
			event: 'change blur',
			handler: vDocu,
			ifValid: function(input) { 
				$( input ).parent().parent().removeClass( 'was-validation' ); 
				$( input ).removeClass( 'is-invalid' );
				$( input ).parent().parent().parent().find( '#AlerDocTenan' ).hide();
			},
			ifInvalid: function (input) { 
				if ( $( input ).val() != '' ){
					$( input ).parent().parent().parent().find( '#AlerDocTenan' ).html ( 'CNPJ ou CPF inválido' );
					$( input ).parent().parent().parent().addClass( 'was-validation' );
					$( input ).addClass( 'is-invalid' );
					$( input ).focus();
					$( input ).parent().parent().parent().find( '#AlerDocTenan' ).show();
				} else {
					$( input ).parent().parent().parent().find( '#AlerDocTenan' ).html ( '' );
					$( input ).parent().parent().parent().removeClass( 'was-validation' ); 
					$( input ).removeClass( 'is-invalid' );
					$( input ).parent().parent().parent().find( '#AlerDocTenan' ).hide();
				};
			}
		});
	}

	/**
	 * Método de retornar dados do CEP
	 * 
	 * @param  vCEP - CEP a ser retornado
	 * @return vResp - array com os dados
	 * @access public
	*/
	static GetCepEnde( vCEP, vResp ){
		$.ajax ({
			type: 'GET',
			url: 'https://viacep.com.br/ws/' + vCEP + '/json/',
			dataType: 'jsonp',
			async: true,
			cache: false,
			success: function ( vRespBack ) {
				vResp ({
					sistema: 'sistema',
					modulo: 'retorna cep',
					status: 'sucesso',
					detalhes: 'CEP válido',
					registros: vRespBack
				});
			},
			error: function ( request, status, erro) {
				vResp ({
					sistema: 'sistema',
					modulo: 'valida documento',
					status: 'erro',
					detalhes: 'Erro na Comunicação. </br> ' +
						'Status: ' + status + ' - ' + request.status + ' - ' + request.statusText + '</br> ' +
						'Descrição: ' + erro + '</br> ' +
						'Detalhes: ' + request.responseText + '</br>',
					registros: '',
				});
			}
		});
	}

	/**
	 * Método para centralizar mascaras de campo
	 * 
	 * @param  vObj - Objeto a ser aplicado mascara
	 * @param  vTipo - Tipo de mascara ( CEP, )
	 * @return null
	 * @access public
	*/
	static SetMask( vObj, vTipo ){
		if ( vTipo == 'CEP' ){
			$( vObj ).mask( '00000-000' );
		};
		if ( vTipo == 'DATA' ){
			$( vObj ).mask( '00/00/0000' );
		};
		if( vTipo == 'INTEIRO' ){
			$( vObj ).mask( '#.##0', { reverse: true } );
		}
	};

	/**
	 * Método de Data chama e instancia a classe
	 * momento.js
	 * 
	 * @return classe
	 * @access public
	*/
	static get Data(){
		return moment;
	}
	
	/**
	 * Método de login chama e instancia a classe
	 * login.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Login(){
		return Login;
	}

	/**
	 * Método de Usuarios chama e instancia a classe
	 * menu.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Menu(){
		return Menu;
	}

	/**
	 * Método de Usuarios chama e instancia a classe
	 * usuarios.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Usuarios(){
		return Usuarios;
	}

	/**
	 * Método de Tenant chama e instancia a classe
	 * tenant.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Tenant(){
		return Tenant;
	}

	/**
	 * Método de Empresas chama e instancia a classe
	 * empresas.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Empresas(){
		return Empresas;
	}

	/**
	 * Método de Clientes chama e instancia a classe
	 * clientes.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Clientes(){
		return Clientes;
	}

	/**
	 * Método de Fabricantes chama e instancia a classe
	 * fabricantes.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Fabricantes(){
		return Fabricantes;
	}

	/**
	 * Método de Materiais chama e instancia a classe
	 * materiais.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Materiais(){
		return Materiais;
	}

	/**
	 * Método de Áreas chama e instancia a classe
	 * areas.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Areas(){
		return Areas;
	}
	
	/**
	 * Método de Amostras chama e instancia a classe
	 * amostras.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Amostras(){
		return Amostras;
	}

	/**
	 * Método de Achatamento chama e instancia a classe
	 * achatamento.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Achatamento(){
		return Achatamento;
	}

	/**
	 * Método de Dobramento chama e instancia a classe
	 * dobramento.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Dobramento(){
		return Dobramento;
	}

	/**
	 * Método de Dureza chama e instancia a classe
	 * dureza.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Dureza(){
		return Dureza;
	}

	/**
	 * Método de Charpy chama e instancia a classe
	 * charpy.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Charpy(){
		return Charpy;
	}
	
	/**
	 * Método de Macrografia chama e instancia a classe
	 * macrografia.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Macrografia(){
		return Macrografia;
	}

	/**
	 * Método de Metalografia chama e instancia a classe
	 * metalografia.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Metalografia(){
		return Metalografia;
	}

	/**
	 * Método de Profundidade Camada Endurecida
	 * chama e instancia a classe
	 * metalografia.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Pcend(){
		return Pcend;
	}

	
	/**
	 * Método de Anexos chama e instancia a classe
	 * anexos.class
	 * 
	 * @return classe
	 * @access public
	*/
	static get Anexos(){
		return Anexos;
	}
};