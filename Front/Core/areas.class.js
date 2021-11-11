/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelas Áreas
 * do sistema
 *
 * @package    Areas
 * @author     Alexandre Farinelli Zardo
*/
export default class Areas {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableArea( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'area_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'area_cada_refe':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'area_cada_descr':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'area_cada_stat':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'area_cada_tenan':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'area_cada_empre':
				return vTabela.cell( vLinha, 6 ).data();
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
	static GetTableArea( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Areas/GetArea/', function( vRespAjax ){
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
							{ data: 'area_cada_boto' },
							{ data: 'area_cada_iden' },
							{ data: 'area_cada_refe' },
							{ data: 'area_cada_descr' },
							{ data: 'area_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'area_cada_tenan', visible: false },
							{ data: 'area_cada_empre', visible: false },
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
							if ( data[ 'area_cada_stat' ] == 0 ) {
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
				vTabela.columns.adjust();			
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabArea' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabArea" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListArea" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-briefcase"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListArea" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenArea" value="Automatico" disabled>' +
								'<label for="IdenArea">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RefeArea" value="" placeholder="" maxlength="20" uppercase>' +
								'<label for="RefeArea">Código Integração</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DescrArea" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="DescrArea">Descrição</label>' +
								'<div class="invalid-feedback">' +
									'Descrição da Área não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatArea" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
							  	'</select>' +
								'<label for="StatArea">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanArea">Tenant</label>' +
								'<select class="form-select" id="TenanArea" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreArea">Empresa</label>' +
								'<select class="form-select" id="EmpreArea" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvArea" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechArea"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabArea' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListArea' ) );
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
	static GetAddArea( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormArea' ], function( ResObjPai ){
			Areas.GetForm( ResObjPai, 'Add', 'INCLUSÃO ÁREA', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Laboratorio/Areas/GetTenanArea/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanArea' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanArea' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanArea' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanArea' ).val(),
						  } }, '../../Laboratorio/Areas/GetEmpreArea/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreArea' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreArea' ).prop( 'disabled', true );
								};
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
	static GetEdtArea( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormArea' ], function( ResObjPai ){
			Areas.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO ÁREA', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Areas/GetTenanArea/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanArea' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_tenan' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanArea' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanArea' ).val(),
						  } }, '../../Laboratorio/Areas/GetEmpreArea/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreArea' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_iden' ) );
								$( ResObjPai ).find( '#RefeArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_refe' ) );
								$( ResObjPai ).find( '#DescrArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_descr' ) );
								$( ResObjPai ).find( '#StatArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_stat' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#EmpreArea' ).val( Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreArea' ).prop( 'disabled', true );
								};
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
	static GetCloseArea( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListArea', 'EdtListArea' ], function( ResObjPai ){
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
	static SetSalvArea( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListArea', 'EdtListArea' ], function( ResObjPai ){
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
							IdenArea: $( ResObjPai ).find( '#IdenArea' ).val(),
							RefeArea: $( ResObjPai ).find( '#RefeArea' ).val(),
							DescrArea: $( ResObjPai ).find( '#DescrArea' ).val(),
							StatArea: $( ResObjPai ).find( '#StatArea' ).val(),
							TenanArea: $( ResObjPai ).find( '#TenanArea' ).val(),
							EmpreArea: $( ResObjPai ).find( '#EmpreArea' ).val(),
						}},
						'../../Laboratorio/Areas/SetSalvArea/', function( vRespAjax ){
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
	static SetDeleArea( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenArea: Core.Areas.GetDataTableArea( '#TableArea', vLinha, 'area_cada_iden' ),
			}},
			'../../Laboratorio/Areas/SetDeleArea/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};