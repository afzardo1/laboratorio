/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelo Menu
 * do sistema
 *
 * @package    Menu
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Menu {
	/**
	 * Método implementado para retornar 
	 * pagina de acordo com o menu
	 *
	 * @param  vPagina - nome da variavel
	 * @return pagina html
	 * @access public
	*/
	static GetMenuPagi( vPagina, vResp ) {
		var vPagina = vPagina.split('#');
		Core.SetAjax(
			{evento:'usua_cada_iden'},
			'../../Sessao/Chk/', function( vRespAjax ){
				if ( vPagina[1] != undefined ) {
					var Urlhash = vPagina[1];
					var UrlHtml = '../' + vPagina[1].toUpperCase().slice( 0, 1 ) + vPagina[1].slice( 1, 100 ) + '/' + vPagina[1] + '.html';
					var UrlJasc = '../' + vPagina[1].toUpperCase().slice( 0, 1 ) + vPagina[1].slice( 1, 100 ) + '/' + vPagina[1];
					vPagina = vPagina[1].split('/');
					if ( vPagina[1] != undefined ) {
						var Final = 0;
						Urlhash = '';
						UrlHtml = '../';
						UrlJasc = '../';
						for ( var i = 0; i < vPagina.length; i++ ) {
							Urlhash = Urlhash + vPagina[ i ];
							UrlHtml = UrlHtml + vPagina[ i ].toUpperCase().slice( 0, 1 ) + vPagina[ i ].slice( 1, 100 );
							UrlJasc = UrlJasc + vPagina[ i ].toUpperCase().slice( 0, 1 ) + vPagina[ i ].slice( 1, 100 );
							if ( i != ( vPagina.length - 1 ) ) {
								Urlhash = vPagina + '/';
							};
							if ( i < vPagina.length ) {
								UrlHtml = UrlHtml + '/';
								UrlJasc = UrlJasc + '/';
							};
							Final = i;
						};
						UrlHtml = UrlHtml + vPagina[ Final ] + '.html';
						UrlJasc = UrlJasc + '/js/' + vPagina[ Final ];
					};
					$.ajax ({
						type: 'GET',
						url: UrlHtml ,
						dataType: 'HTML',
						async: true,
						success: function ( vRespBack ) {
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
								var today = new Date();
								var today = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '' + today.getMilliseconds();
								$('head').append( '<script type="module"> import {} from "' + UrlJasc + '.js?v=' + today + '";	</script>' );
								//$.getScript( UrlJasc + '.js' );
								history.pushState( {}, null, 'menu.html#' + Urlhash );
								$( '[href="#' +  Urlhash + '"]' ).click();
								$( '#SeleDadosMenu' ).html('');
								$( '#SeleDadosMenu' ).html( vRespBack );
								vStatus = 'carregado';
								vDestalhes = 'Menu carregado com sucesso';
								vRegistros = true;
							};
							vResp ({
								sistema: 'laboratorio',
								modulo: 'menu',
								status: vStatus,
								detalhes: vDestalhes,
								registros: vRegistros
							});
						},
						error: function (request, status, erro) {
							vResp ({
								sistema: 'laboratorio',
								modulo: 'menu',
								status: 'erro',
								detalhes: 'Erro na Comunicação. </br> ' +
									'Status: ' + status + ' - ' + request.status + ' - ' + request.statusText + '</br> ' +
									'Descrição: ' + erro + '</br> ' +
									'Detalhes: ' + request.responseText + '</br>',
								registros: '',
							});  
						},
					});
				} else {
					vResp (vRespAjax);	
				};
			}
		);
	};

	/**
	 * Método para aplicar a rotini incial  
	 * do menu do sistema
	 *
	 * @return nada
	 * @access public
	*/
	static GetMenuInicia() {
		$( '#UsuaNomeMemu' ).html( Core.Login.GetUsuaSess( 'usua_cada_nome' ) );
		Core.SetAjax(
			{evento:'usua_cada_iden'},
			'../../Comum/Menu/GetMenuSist/', function( vRespAjax ){
				var MontMenu = [];
				for ( var i = 0; i < vRespAjax.registros.length; i++ ) {
					var DadosMenu = {};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 11 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 12 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 13 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 14 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 0;	
						DadosMenu['menu'] = '#MenuCada';
						DadosMenu['href'] = '#usuarios';
						DadosMenu['icone'] = 'fas fa-users';
						DadosMenu['submenu'] = 'Usuários';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 21 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 22 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 23 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 24 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 1;
						DadosMenu['menu'] = '#MenuCada';
						DadosMenu['href'] = '#tenant';
						DadosMenu['icone'] = 'fas fa-gopuram';
						DadosMenu['submenu'] = 'Tenant (Inquilino)';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 31 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 32 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 33 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 34 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 2;
						DadosMenu['menu'] = '#MenuCada';
						DadosMenu['href'] = '#empresas';
						DadosMenu['icone'] = 'far fa-building';
						DadosMenu['submenu'] = 'Empresas';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 41 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 42 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 43 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 44 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 3;
						DadosMenu['menu'] = '#MenuCada';
						DadosMenu['href'] = '#clientes';
						DadosMenu['icone'] = 'fas fa-briefcase';
						DadosMenu['submenu'] = 'Clientes';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 51 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 52 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 53 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 54 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 4;
						DadosMenu['menu'] = '#MenuCada';
						DadosMenu['href'] = '#fabricantes';
						DadosMenu['icone'] = 'fas fa-industry';
						DadosMenu['submenu'] = 'Fabricantes';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 71 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 72 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 73 ) ||
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 74 ) ) &&
				  		 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 5;
						DadosMenu['menu'] = '#MenuCada';
				 		DadosMenu['href'] = '#areas';
				 		DadosMenu['icone'] = 'fas fa-briefcase';
				 		DadosMenu['submenu'] = 'Áreas';
			 		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 61 ) || 
					       ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 62 ) ||
					       ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 63 ) ||
					       ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 64 ) ) &&
				         ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 20;
						DadosMenu['menu'] = '#Materiais';
				  		DadosMenu['href'] = '#materiais';
				   		DadosMenu['html'] = 'Materiais';
				  		DadosMenu['icone'] = 'fas fa-atom';
				  		DadosMenu['submenu'] = '';
			  		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 81 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 82 ) ||
					  	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 83 ) ||
	 					   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 84 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 19;
						DadosMenu['menu'] = '#Amostras';
					 	DadosMenu['href'] = '#amostras';
					  	DadosMenu['html'] = 'Cad. Amostras';
					 	DadosMenu['icone'] = 'fas fa-fill-drip';
					 	DadosMenu['submenu'] = '';
				 	};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 131 ) || 
					 	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 132 ) ||
					   	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 133 ) ||
					  	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 134 ) ) &&
					 	 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
				  		DadosMenu['ordem'] = 6;
				  		DadosMenu['menu'] = '#Quimico';
				   		DadosMenu['href'] = '#quimico';
						DadosMenu['html'] = 'Quimíco';
				   		DadosMenu['icone'] = 'fas fa-vials';
				   		DadosMenu['submenu'] = '';
			   		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 127 ) || 
					 		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 128 ) ||
					   		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 129 ) ||
					  		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 130 ) ) &&
					 	  ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
				  		DadosMenu['ordem'] = 7;
				  		DadosMenu['menu'] = '#Pcend';
				   		DadosMenu['href'] = '#pcend';
						DadosMenu['html'] = 'P. Camada Endurecida';
				   		DadosMenu['icone'] = 'fas fa-cube';
				   		DadosMenu['submenu'] = '';
			   		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 91 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 92 ) ||
					  	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 93 ) ||
	 					   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 94 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 8;
						DadosMenu['menu'] = '#Metalografia';
					 	DadosMenu['href'] = '#metalografia';
					  	DadosMenu['html'] = 'Metalográfico';
					 	DadosMenu['icone'] = 'fas fa-microscope';
					 	DadosMenu['submenu'] = '';
					};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 123 ) || 
					 		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 124 ) ||
					   		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 125 ) ||
					  		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 126 ) ) &&
					 	  ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
				  		DadosMenu['ordem'] = 9;
				  		DadosMenu['menu'] = '#Macrografia';
				   		DadosMenu['href'] = '#macrografia';
						DadosMenu['html'] = 'Macrografia';
				   		DadosMenu['icone'] = 'far fa-eye';
				   		DadosMenu['submenu'] = '';
			   		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 115 ) || 
					 		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 116 ) ||
					   		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 117 ) ||
					  		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 118 ) ) &&
					 	  ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
				  		DadosMenu['ordem'] = 10;
				  		DadosMenu['menu'] = '#Dureza';
				   		DadosMenu['href'] = '#dureza';
						DadosMenu['html'] = 'Dureza';
				   		DadosMenu['icone'] = 'fab fa-creative-commons-remix';
				   		DadosMenu['submenu'] = '';
			   		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 111 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 112 ) ||
					  	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 113 ) ||
	 					   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 114 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 11;
						DadosMenu['menu'] = '#Dobramento';
					 	DadosMenu['href'] = '#dobramento';
					  	DadosMenu['html'] = 'Dobramento';
					 	DadosMenu['icone'] = 'fas fa-magnet';
					 	DadosMenu['submenu'] = '';
				 	};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 119 ) || 
					 		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 120 ) ||
					   		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 121 ) ||
					  		( vRespAjax.registros[i].usua_aces_cada_opca_iden == 122 ) ) &&
					 	  ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
				  		DadosMenu['ordem'] = 12;
				  		DadosMenu['menu'] = '#Charpy';
				   		DadosMenu['href'] = '#charpy';
						DadosMenu['html'] = 'Charpy';
				   		DadosMenu['icone'] = 'fas fa-weight';
				   		DadosMenu['submenu'] = '';
			   		};
					if ( ( ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 101 ) || 
						   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 102 ) ||
					  	   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 103 ) ||
	 					   ( vRespAjax.registros[i].usua_aces_cada_opca_iden == 104 ) ) &&
						 ( vRespAjax.registros[i].usua_aces_cada_opca_stat == 1 ) ) {
						DadosMenu['ordem'] = 13;
						DadosMenu['menu'] = '#Achatamento';
					 	DadosMenu['href'] = '#achatamento';
					  	DadosMenu['html'] = 'Achatamento/Expansão';
					 	DadosMenu['icone'] = 'fas fa-compress-arrows-alt';
					 	DadosMenu['submenu'] = '';
				 	};
			 		if ( MontMenu[ DadosMenu['ordem'] ] == undefined ){
				 		MontMenu[ DadosMenu['ordem'] ] = DadosMenu;
			 		};
				};
				MontMenu.sort(function (a, b) {
					if (a.ordem < b.ordem) {
					  return 1;
					}
					if (a.ordem > b.ordem) {
					  return -1;
					}
					// a must be equal to b
					return 0;
				});
				Object.keys( MontMenu ).forEach( function( item ){
					if ( MontMenu[item].href != undefined ){
						if ( MontMenu[item].submenu != '' ){
							$( '#MenuSist' ).find( DadosMenu['menu'] ).prepend(
								'<li class="nav-item ps-4">' +
									'<a id="ItemMenu" href="' + MontMenu[item].href + '" class="nav-link">' +
										'<i class="nav-icon ' +  MontMenu[item].icone + '"></i>' +
										'<p>' +
											MontMenu[item].submenu +
										'</p>' +
									'</a>' +
								'</li>'
							);
						};
						if ( MontMenu[item].submenu == '' ){
							$( '#MenuSist' ).append(
								'<li id="' + DadosMenu['menu'] + '" class="nav-item">' +
									'<a id="ItemMenu" href="' + MontMenu[item].href + '" class="nav-link">' +
										'<i class="nav-icon ' +  MontMenu[item].icone + '"></i>' +
										'<p>' +
											MontMenu[item].html +
										'</p>'+
									'</a>' +
								'</li>'
							);
						};
					};
				});
				$( '#MenuSist' ).append(
					'<li class="nav-item">' +
						'<a id="SairMenu" class="nav-link">' +
							'<i class="nav-icon fas fa-door-open"></i>' +
							'<p>' +
								'Sair' +
							'</p>'+
						'</a>' +
					'</li>'
				);
			}
		);
	};

	/**
	 * Método para fechar o sistema  
	 * do menu do sistema
	 *
	 * @return nada
	 * @access public
	*/
	static GetMenuSair() {
		Core.SetAjax(
			{evento:'usua_cada_iden'},
			'../../Sessao/Dst/', function( vRespAjax ){
				location.href = '../../index.html';
			}
		);
	};
};