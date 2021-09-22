/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pela Empresas
 * do sistema
 *
 * @package    Clientes
 * @author     Alexandre Farinelli Zardo
*/
export default class Clientes {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableClie( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'clie_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'clie_cada_refe':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'clie_cada_docu':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'clie_cada_nome':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'clie_cada_stat':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'clie_cada_tenan':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'clie_cada_empre':
				return vTabela.cell( vLinha, 7 ).data();
				break;
		};
	};
	
	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * @param  vResp - Calback
	 * @return Calback
	 * @access public
	*/
	static GetTableClie( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Clientes/GetClie/', function( vRespAjax ){
				if ( vRespAjax.status == 'sucesso' ){
					vTabela = $( vTabela ).DataTable({
						fixedHeader: true,
						info: true,
						scrollCollapse: true,
						retrieve: true,
						responsive: true,
						data: vRespAjax.registros,
						select: { style: 'single' },
						ordering: true,
						order: [ [ 4, 'asc' ] ],
						columns: [
							{ data: 'clie_cada_boto' },
							{ data: 'clie_cada_iden' },
							{ data: 'clie_cada_refe' },
							{ data: 'clie_cada_docu' },
							{ data: 'clie_cada_nome' },
							{ data: 'clie_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'clie_cada_tenan', visible: false },
							{ data: 'clie_cada_empre', visible: false },
						], 
						language: {
							"decimal": ",",
							"thousands": ".",
							"sEmptyTable": "Nenhum registro encontrado",
							"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
							"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
							"sInfoFiltered": "(Filtrados de _MAX_ registros)",
							"sInfoPostFix": "",
							"sInfofoThousands": ".",
							"sLengthMenu": "_MENU_ resultados por página",
							"sLoadingRecords": "Carregando...",
							"sProcessing": "Processando...",
							"sZeroRecords": "Nenhum registro encontrado",
							"sSearch": "Pesquisar",
							"oPaginate": {
								"sNext": "Próximo",
								"sPrevious": "Anterior",
								"sFirst": "Primeiro",
								"sLast": "Último"
							},
							"oAria": {
								"sSortAscending": ": Ordenar colunas de forma ascendente",
								"sSortDescending": ": Ordenar colunas de forma descendente"
							},
							"select": {
								"rows": {
								"_": "Selecionado %d linhas",
								"0": "Nenhuma linha selecionada",
								"1": "Selecionado 1 linha"
								},
							},
						},
						createdRow: function( row, data, dataIndex ) {
							if ( data[ 'clie_cada_stat' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							};
						},
					});
					vTabela.clear();
					vTabela.rows.add( vRespAjax.registros );
					vTabela.draw();
				} else {
					vTabela = $( vTabela ).DataTable();
				};				
				vResp ( vRespAjax );
			}
		);
		$( vTabela ).on( 'click', 'tbody tr', function () {
			//$('.selected').removeClass('selected');
			$( this ).toggleClass( 'selected' );
		});
	};

	/**
	 * Método para gerar formulario
	 * no sistema
	 * 
	 * @return Aba e formulário
	 * @access public
	*/
	static GetForm( vResObjPai, vAba, vApelido, vResp ) {
		if ( $( vResObjPai ).find( '#' + vAba + 'TabClie' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabClie" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListClie" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-briefcase"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListClie" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenClie" value="Automatico" disabled>' +
								'<label for="IdenClie">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RefeClie" value="" placeholder="" maxlength="20" uppercase>' +
								'<label for="RefeClie">Código Integração</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DocClie" value="" placeholder="" maxlength="20" uppercase autofocus data-obriga="S" aria-describedby="CnpjBntClie">' +
								'<label for="DocClie">CNPJ ou CPF.</label>' +
							'</div>' +
							'<div id="AlerDocClie" class="invalid-feedback">' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatClie" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
							  	'</select>' +
								'<label for="StatClie">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NomeClie" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="NomeClie">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Nome do Cliente não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanClie">Tenant</label>' +
								'<select class="form-select" id="TenanClie" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreClie">Empresa</label>' +
								'<select class="form-select" id="EmpreClie" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvClie" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechClie"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabClie' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListClie' ) );
	}
	
	/**
	 * Método para incluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetAddClie( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormClie' ], function( ResObjPai ){
			Clientes.GetForm( ResObjPai, 'Add', 'INCLUSÃO CLIENTE', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Clientes/GetTenanClie/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanClie' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanClie' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanClie' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanClie' ).val(),
						  } }, '../../Clientes/GetEmpreClie/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreClie' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreClie' ).prop( 'disabled', true );
								};
								Core.ValiDocu( $( ResObjPai ).find( '#DocClie' ) );
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							});
						});
					});
				});
			});
		});
	};

	/**
	 * Método para alterar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetEdtClie( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormClie' ], function( ResObjPai ){
			Clientes.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO CLIENTE', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Clientes/GetTenanClie/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanClie' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_tenan' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanClie' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanClie' ).val(),
						  } }, '../../Clientes/GetEmpreClie/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreClie' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_iden' ) );
								$( ResObjPai ).find( '#RefeClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_refe' ) );
								$( ResObjPai ).find( '#DocClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_docu' ) );
								$( ResObjPai ).find( '#StatClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_stat' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#NomeClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_nome' ) );
								$( ResObjPai ).find( '#EmpreClie' ).val( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreClie' ).prop( 'disabled', true );
								};
								Core.ValiDocu( $( ResObjPai ).find( '#DocClie' ) );
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							});
						});
					})
				})
			});
		});
	};

	/**
	 * Método para sair tela
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetCloseClie( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListClie', 'EdtListClie' ], function( ResObjPai ){
			$( '#' + $( ResObjPai ).attr( 'id' ).replace( 'List', 'Tab' ) ).remove();
			$( ResObjPai ).remove();
			vResp( ResObjPai );
		});
	};

	/**
	 * Método para salvar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetSalvClie( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListClie', 'EdtListClie' ], function( ResObjPai ){
			Core.GetCampObri( ResObjPai, [ '' ], '[data-obriga="S"]', function( ResObjVali ){
				$( '.has-validated' ).removeClass( 'has-validated' );
                $( '.is-invalid' ).removeClass( 'is-invalid' );
				if ( ResObjVali != 'validado' ){
					$( ResObjVali ).parent().addClass( 'has-validated' );
                    $( ResObjVali ).addClass( 'is-invalid' );
					setTimeout( function(){
						vResp( { vResObjPai: ResObjPai, vResObjVali: ResObjVali } );
					}, 300);
                } else {
					Core.SetAjax({
						evento:{
							IdenClie: $( ResObjPai ).find( '#IdenClie' ).val(),
							RefeClie: $( ResObjPai ).find( '#RefeClie' ).val(),
							DocClie: $( ResObjPai ).find( '#DocClie' ).val(),
							NomeClie: $( ResObjPai ).find( '#NomeClie' ).val(),
							StatClie: $( ResObjPai ).find( '#StatClie' ).val(),
							TenanClie: $( ResObjPai ).find( '#TenanClie' ).val(),
							EmpreClie: $( ResObjPai ).find( '#EmpreClie' ).val(),
						}},
						'../../Clientes/SetSalvClie/', function( vRespAjax ){
							Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
							Core.MensMenu.show();
							setTimeout( function(){
								vResp( { vResObjPai: ResObjPai, vRespAjax: vRespAjax } );
							}, 300);
						},
					);
				};
			})
		});
	};

	/**
	 * Método para excluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetDeleClie( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenClie: Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'clie_cada_iden' ),
			}},
			'../../Clientes/SetDeleClie/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};