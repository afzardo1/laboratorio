/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel dobramento
 * do sistema
 *
 * @package    Dobramento
 * @author     Alexandre Farinelli Zardo
*/
export default class Dobramento {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableDobra( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_dobra_cada_iden':
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'amos_cada_emis':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'amos_cada_regi':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'amos_cada_orse':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'amos_cada_descr':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'amos_dobra_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_dobra_cada_result':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'clie_cada_nome':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'fabr_cada_nome':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'mate_cada_descr':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'area_cada_descr':
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'amos_cada_local':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'amos_dobra_cada_qtde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_dobra_cada_obs':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_dobra_cada_fina_data':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_dobra_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_cada_tipo':
				return vTabela.cell( vLinha, 20 ).data();
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
	static GetTableDobra( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Dobramento/GetDobra/', function( vRespAjax ){
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
						order: [ [ 1, 'asc' ] ],
						columns: [
							{ data: 'amos_dobra_cada_boto' },
							{ data: 'amos_dobra_cada_iden' },
							{ data: 'amos_cada_emis', render: function(d) {
								if ( d == '' ) {
									return '';
								} else {
									return Core.Data( d ).format('L');
								};
							} },
							{ data: 'amos_cada_regi' },
							{ data: 'amos_cada_orse' },
							{ data: 'amos_cada_descr' },
							{ data: 'amos_dobra_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_dobra_cada_result', render: function(d) {
								if ( d == -1 ) {
									return 'AGUARDANDO';
								} else if ( d == 0 ) {
									return 'REPROVADO';
								} else if ( d == 1 ) {
									return 'INFORMATIVO';
								} else if ( d == 2 ) {
									return 'TOLERAVEL';
								} else if ( d == 3 ) {
									return 'APROVADO';
								};
							} },
							{ data: 'clie_cada_nome', visible: false },
							{ data: 'fabr_cada_nome', visible: false },
							{ data: 'mate_cada_descr', visible: false },
							{ data: 'area_cada_descr', visible: false },
							{ data: 'amos_cada_local', visible: false },
							{ data: 'amos_dobra_cada_qtde', visible: false },
							{ data: 'amos_dobra_cada_obs', visible: false },
							{ data: 'amos_dobra_cada_fina_data', visible: false },
							{ data: 'amos_dobra_cada_fina_usua_iden', visible: false },
							{ data: 'amos_cada_iden', visible: false },
							{ data: 'amos_cada_tenan', visible: false },
							{ data: 'amos_cada_empre', visible: false },
							{ data: 'amos_cada_tipo', visible: false },
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
							if ( data[ 'amos_dobra_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_dobra_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_dobra_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_dobra_cada_result' ] == 3 ) {
								$( row ).addClass( 'bg-success' );
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabDobra' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabDobra" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListDobra" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-magnet"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListDobra" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenDobra" value="Automatico" disabled>' +
								'<label for="IdenDobra">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisDobra" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisDobra">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGDobra" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGDobra">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSDobra" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSDobra">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieDobra" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieDobra">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrDobra" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrDobra">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateDobra" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateDobra">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaDobra" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaDobra">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrDobra" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrDobra">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LocaDobra" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaDobra">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="TipoTracaDobra" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="TipoTracaDobra">Tipo Dobramento</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulDobra" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulDobra">Resultado Dobramento</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Dobramento não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeDobra" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeDobra">Quantidade</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseDobra" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseDobra">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaDobra">' +
								'<label class="form-check-label" for="FinaDobra">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaDobra" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaDobra">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutDobra">Executado Por</label>' +
								'<select class="form-select" id="ExcutDobra" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexDobra" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnDobra" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableDobra" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataDobra">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvDobra" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechDobra"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabDobra' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListDobra' ) );
	}
	
	/**
	 * Método para alterar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetEdtDobra( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormDobra' ], function( ResObjPai ){
			Dobramento.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO DOBRAMENTO', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Dobramento/GetUsuaDobra/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutDobra' ), Resposta.registros, function(){
						if ( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvDobra' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_iden' ) );
						$( ResObjPai ).find( '#EmisDobra' ).val( Core.Data( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#TipoTracaDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_tipo' ) );
						$( ResObjPai ).find( '#ResulDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeDobra' ), 'INTEIRO' );
						$( ResObjPai ).find( '#ObseDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_obs' ) )
						$( ResObjPai ).find( '#FinaDobra' ).prop( 'checked', false );
						if ( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaDobra' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaDobra' ).val( '' );
						$( ResObjPai ).find( '#ExcutDobra' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaDobra' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaDobra' ).val( Core.Data( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutDobra' ).val( Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_dobra_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaDobra' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutDobra' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaDobra' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutDobra' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaDobra', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableDobra' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenDobra' ).val(),
								'anexo_ensa_tabe': 'DOBRAMENTO',
							} }, function( vRespLogi ){
								if ( vRespLogi.status != 'sucesso' ){
									$( '#AlertMenuCont' ).html(
										'<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
											'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
										'</div>'
									);
									$( '#AlertMenu' ).removeClass('alert alert-warning');
									$( '#AlertMenu' ).removeClass('alert alert-danger');
									if ( vRespLogi.status == 'invalido'){
										$( '#AlertMenu' ).addClass('alert alert-warning');
									} else if ( vRespLogi.status == 'erro'){
										$( '#AlertMenu' ).addClass('alert alert-danger');
									};
									$( '#AlertMenu' ).prepend( vRespLogi.detalhes );
									$( '#AlertMenu' ).addClass('show');
									$( '#AlertMenu' ).show();
								};
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							}
						);
					});
				});
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
	static GetCloseDobra( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListDobra', 'EdtListDobra' ], function( ResObjPai ){
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
	static SetSalvDobra( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListDobra', 'EdtListDobra' ], function( ResObjPai ){
			Core.GetCampObri( ResObjPai, [ '', '-1' ], '[data-obriga="S"]', function( ResObjVali ){
				$( '.has-validated' ).removeClass( 'has-validated' );
                $( '.is-invalid' ).removeClass( 'is-invalid' );
				if ( ResObjVali != 'validado' ){
					$( ResObjVali ).parent().addClass( 'has-validated' );
                    $( ResObjVali ).addClass( 'is-invalid' );
					setTimeout( function(){
						vResp( { vResObjPai: ResObjPai, vResObjVali: ResObjVali } );
					}, 300);
                } else {
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableDobra' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_iden' ),
								IdenDobra: $( ResObjPai ).find( '#IdenDobra' ).val(),
								ResulDobra: $( ResObjPai ).find( '#ResulDobra' ).val(),
								QtdeDobra: $( ResObjPai ).find( '#QtdeDobra' ).val(),
								ObseDobra: $( ResObjPai ).find( '#ObseDobra' ).val(),
								FinaDobra: $( ResObjPai ).find( '#FinaDobra' ).is( ':checked' ),
								DatFinaDobra: $( ResObjPai ).find( '#DatFinaDobra' ).val(),
								ExcutDobra: $( ResObjPai ).find( '#ExcutDobra' ).val(),
								anexo_ensa_tabe: 'DOBRAMENTO',
								AnexosDobra: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Dobramento/SetSalvDobra/', function( vRespAjax ){
								Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
								Core.MensMenu.show();
								setTimeout( function(){
									vResp( { vResObjPai: ResObjPai, vRespAjax: vRespAjax } );
								}, 300);
							},
						);
					});
				};
			})
		});
	};

	/**
	 * Método para imprimir
	 * no sistema
	 * 
	 * @param  vFiltros - Dados Para filtrar
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetImpreDobra( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Dobramento/SetImpreDobra/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};