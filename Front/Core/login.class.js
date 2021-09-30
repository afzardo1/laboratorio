/*CARREGA DEPENDENCIA MD5 DO SISTEMA*/
import '../Dependencias/md5/jquery.md5.js';
/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

/**
 * Esta classe e responsavel pelo login.
 * dos usuarios
 *
 * @package    Login
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Login {
	/**
	 * Método implementado para retornar 
	 * valor de variaveis de sessão
	 *
	 * @param  vVariavel - nome da variavel
	 * @return valor da variavel
	 * @access public
	*/
	static GetUsuaSess( vVariavel ) {
		if ( sessionStorage.getItem( 'usuarios' ) != undefined ){
			var vUsuarios = JSON.parse( sessionStorage.getItem( 'usuarios' ) ); 
			if ( vUsuarios[ vVariavel ] != undefined ){
				return vUsuarios[ vVariavel ];
			} else {
				return false;
			}
		} else {
			return false;
		};
	};

	/**
	 * Método implementado para armazenar
	 * valor de variaveis de sessão
	 *
	 * @param  vVariavel - nome da variavel
	 * @return boolean
	 * @access public
	*/
	static SetUsuaSess( vVariavel ) {
		sessionStorage.setItem( 'usuarios', JSON.stringify( vVariavel ) );
		return true;
	};

	/**
	 * Método implementado para validar 
	 * o usuario no sistema
	 *
	 * @param  vEmail - Email do usuario
	 * @param  vSenha - Senha usuario
	 * @param  vSenha - calback
	 * 
	 * @return resposta do ajax
	 * @access public
	*/
    static GetValiUsua( vEmail, vSenha, vResp ) {
		if ( Core.GetValiEmail( vEmail ) == true ) {
			Core.SetAjax({
				evento:{
					email: vEmail,
					senha: $.md5(vSenha)
				}
			},
			'Comum/Login/GetLogin/', function( vRespAjax ){
				sessionStorage.clear();
				if ( vRespAjax.registros[0] != undefined ){
					if ( vRespAjax.registros[0].usua_cada_troca_senha == 0 ){
						Login.SetUsuaSess({
							usua_cada_iden: vRespAjax.registros[0].usua_cada_iden,
							usua_cada_nome: vRespAjax.registros[0].usua_cada_nome,
							usua_cada_tipo: vRespAjax.registros[0].usua_cada_tipo,
							usua_cada_login: vRespAjax.registros[0].usua_cada_login,
							usua_cada_tenant: vRespAjax.registros[0].usua_cada_tenant,
							usua_cada_empre: vRespAjax.registros[0].usua_cada_empre,
						});
					} else {
						Login.SetUsuaSess({
							usua_cada_iden: vRespAjax.registros[0].usua_cada_iden,
							usua_cada_nome: vRespAjax.registros[0].usua_cada_nome,
						});
						location.href = 'Front/Login/novasenha.html';
						return;
					};
				};
				vResp ( vRespAjax );
			})
		} else {
			vResp ({
				sistema: 'laboratorio',
				modulo: 'login',
				status: 'invalido',
				detalhes: 'E-mail invalido',
				registros: '',
			});
		}
	};

	/**
	 * Método implementado para validar 
	 * o usuario no sistema
	 *
	 * @param  vEmail - Email do usuario
	 * @param  vSenha - Senha usuario
	 * @param  vSenha - calback
	 * 
	 * @return resposta do ajax
	 * @access public
	*/
    static GetAlteSenhaLogi( vIdenUsua, vSenha, vResp ) {
		Core.SetAjax({
			evento:{
				IdenUsua: vIdenUsua,
				senha: $.md5(vSenha)
			}
		},
		'Comum/Login/GetAlteSenhaLogi/', function( vRespAjax ){
			sessionStorage.clear();
			if ( vRespAjax.registros[0] != undefined ){
				Login.SetUsuaSess({
					usua_cada_iden: vRespAjax.registros[0].usua_cada_iden,
					usua_cada_nome: vRespAjax.registros[0].usua_cada_nome,
					usua_cada_tipo: vRespAjax.registros[0].usua_cada_tipo,
					usua_cada_login: vRespAjax.registros[0].usua_cada_login,
				});
			};
			vResp ( vRespAjax );
		})
	}
};