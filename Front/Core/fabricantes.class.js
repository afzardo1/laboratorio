/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelos fabricantes
 * do sistema
 *
 * @package    Fabricantes
 * @author     Alexandre Farinelli Zardo
*/
export default class Fabricantes {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableFabr( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'fabr_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'fabr_cada_refe':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'fabr_cada_docu':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'fabr_cada_nome':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'fabr_cada_stat':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'fabr_cada_tenan':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'fabr_cada_empre':
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
	static GetTableFabr( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Fabricantes/GetFabr/', function( vRespAjax ){
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
							{ data: 'fabr_cada_boto' },
							{ data: 'fabr_cada_iden' },
							{ data: 'fabr_cada_refe' },
							{ data: 'fabr_cada_docu' },
							{ data: 'fabr_cada_nome' },
							{ data: 'fabr_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'fabr_cada_tenan', visible: false },
							{ data: 'fabr_cada_empre', visible: false },
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
							if ( data[ 'fabr_cada_stat' ] == 0 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabFabr' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabFabr" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListFabr" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-industry"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListFabr" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenFabr" value="Automatico" disabled>' +
								'<label for="IdenFabr">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RefeFabr" value="" placeholder="" maxlength="20" uppercase>' +
								'<label for="RefeFabr">Código Integração</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DocFabr" value="" placeholder="" maxlength="20" uppercase autofocus data-obriga="S" aria-describedby="CnpjBntFabr">' +
								'<label for="DocFabr">CNPJ ou CPF.</label>' +
							'</div>' +
							'<div id="AlerDocFabr" class="invalid-feedback">' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatFabr" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
							  	'</select>' +
								'<label for="StatFabr">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NomeFabr" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="NomeFabr">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Nome do Fabricante não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanFabr">Tenant</label>' +
								'<select class="form-select" id="TenanFabr" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreFabr">Empresa</label>' +
								'<select class="form-select" id="EmpreFabr" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvFabr" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechFabr"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabFabr' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListFabr' ) );
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
	static GetAddFabr( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormFabr' ], function( ResObjPai ){
			Fabricantes.GetForm( ResObjPai, 'Add', 'INCLUSÃO FABRICANTE', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Fabricantes/GetTenanFabr/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanFabr' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanFabr' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanFabr' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanFabr' ).val(),
						  } }, '../../Fabricantes/GetEmpreFabr/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreFabr' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreFabr' ).prop( 'disabled', true );
								};
								Core.ValiDocu( $( ResObjPai ).find( '#DocFabr' ) );
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
	static GetEdtFabr( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormFabr' ], function( ResObjPai ){
			Fabricantes.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO FABRICANTE', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Fabricantes/GetTenanFabr/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanFabr' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_tenan' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanFabr' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanFabr' ).val(),
						  } }, '../../Fabricantes/GetEmpreFabr/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreFabr' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_iden' ) );
								$( ResObjPai ).find( '#RefeFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_refe' ) );
								$( ResObjPai ).find( '#DocFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_docu' ) );
								$( ResObjPai ).find( '#StatFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_stat' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#NomeFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_nome' ) );
								$( ResObjPai ).find( '#EmpreFabr' ).val( Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreFabr' ).prop( 'disabled', true );
								};
								Core.ValiDocu( $( ResObjPai ).find( '#DocFabr' ) );
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
	static GetCloseFabr( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListFabr', 'EdtListFabr' ], function( ResObjPai ){
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
	static SetSalvFabr( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListFabr', 'EdtListFabr' ], function( ResObjPai ){
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
							IdenFabr: $( ResObjPai ).find( '#IdenFabr' ).val(),
							RefeFabr: $( ResObjPai ).find( '#RefeFabr' ).val(),
							DocFabr: $( ResObjPai ).find( '#DocFabr' ).val(),
							NomeFabr: $( ResObjPai ).find( '#NomeFabr' ).val(),
							StatFabr: $( ResObjPai ).find( '#StatFabr' ).val(),
							TenanFabr: $( ResObjPai ).find( '#TenanFabr' ).val(),
							EmpreFabr: $( ResObjPai ).find( '#EmpreFabr' ).val(),
						}},
						'../../Fabricantes/SetSalvFabr/', function( vRespAjax ){
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
	static SetDeleFabr( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenFabr: Core.Fabricantes.GetDataTableFabr( '#TableFabr', vLinha, 'fabr_cada_iden' ),
			}},
			'../../Fabricantes/SetDeleFabr/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};