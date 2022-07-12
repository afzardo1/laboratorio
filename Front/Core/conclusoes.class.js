/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelas Áreas
 * do sistema
 *
 * @package    Conclusoes
 * @author     Alexandre Farinelli Zardo
*/
export default class Conclusoes {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableConcl( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'labo_amos_concl_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'labo_amos_concl_apeli':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'labo_amos_concl_obse':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'labo_amos_concl_tenan':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'labo_amos_concl_empre':
				return vTabela.cell( vLinha, 5 ).data();
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
	static GetTableConcl( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Conclusoes/GetAmosConcl/', function( vRespAjax ){
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
						order: [ [ 2, 'asc' ] ],
						columns: [
							{ data: 'labo_amos_concl_boto' },
							{ data: 'labo_amos_concl_iden' },
							{ data: 'labo_amos_concl_apeli' },
							{ data: 'labo_amos_concl_obse' },
							{ data: 'labo_amos_concl_tenan', visible: false },
							{ data: 'labo_amos_concl_empre', visible: false },
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabConcl' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabConcl" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListConcl" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon far fa-comments"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListConcl" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenConcl" value="Automatico" disabled>' +
								'<label for="IdenConcl">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ApelConcl" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="ApelConcl">Apelido</label>' +
								'<div class="invalid-feedback">' +
									'Apelido não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-8">' +
							'<div class="form-floating">' +
								'<textarea class="form-control" placeholder="" id="DescrConcl" style="height: 100px"></textarea>' +
								'<label for="DescrConcl">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanConcl">Tenant</label>' +
								'<select class="form-select" id="TenanConcl" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreConcl">Empresa</label>' +
								'<select class="form-select" id="EmpreConcl" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvConcl" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechConcl"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabConcl' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListConcl' ) );
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
	static GetAddConcl( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormConcl' ], function( ResObjPai ){
			Conclusoes.GetForm( ResObjPai, 'Add', 'INCLUSÃO CONCLUSÕES', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Laboratorio/Conclusoes/GetTenanAmosConcl/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanConcl' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanConcl' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanConcl' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanConcl' ).val(),
						  } }, '../../Laboratorio/Conclusoes/GetEmpreAmosConcl/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreConcl' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreConcl' ).prop( 'disabled', true );
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
	static GetEdtConcl( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormConcl' ], function( ResObjPai ){
			Conclusoes.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO CONCLUSÕES', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Conclusoes/GetTenanAmosConcl/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanConcl' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'area_cada_tenan' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanConcl' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanConcl' ).val(),
						  } }, '../../Laboratorio/Conclusoes/GetEmpreAmosConcl/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreConcl' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_iden' ) );
								$( ResObjPai ).find( '#ApelConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_apeli' ) );
								$( ResObjPai ).find( '#DescrConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_obse' ) );
								$( ResObjPai ).find( '#TenanConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_tenan' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#EmpreConcl' ).val( Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreConcl' ).prop( 'disabled', true );
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
	static GetCloseConcl( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListConcl', 'EdtListConcl' ], function( ResObjPai ){
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
	static SetSalvConcl( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListConcl', 'EdtListConcl' ], function( ResObjPai ){
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
							IdenConcl: $( ResObjPai ).find( '#IdenConcl' ).val(),
							ApelConcl: $( ResObjPai ).find( '#ApelConcl' ).val(),
							DescrConcl: $( ResObjPai ).find( '#DescrConcl' ).val(),
							TenanConcl: $( ResObjPai ).find( '#TenanConcl' ).val(),
							EmpreConcl: $( ResObjPai ).find( '#EmpreConcl' ).val(),
						}},
						'../../Laboratorio/Conclusoes/SetSalvAmosConcl/', function( vRespAjax ){
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
	static SetDeleConcl( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenConcl: Core.Conclusoes.GetDataTableConcl( '#TableConcl', vLinha, 'labo_amos_concl_iden' ),
			}},
			'../../Laboratorio/Conclusoes/SetDeleAmosConcl/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};