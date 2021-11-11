/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel profundidade 
 * camada endurecida do sistema
 *
 * @package    Pcend
 * @author     Alexandre Farinelli Zardo
*/
export default class Pcend {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTablePcend( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_pcend_cada_iden':
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
			case 'amos_pcend_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_pcend_cada_result':
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
			case 'amos_pcend_cada_qtde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_pcend_cada_obs':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_pcend_cada_fina_data':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_pcend_cada_fina_usua_iden':
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
	static GetTablePcend( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Pcend/GetPcend/', function( vRespAjax ){
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
							{ data: 'amos_pcend_cada_boto' },
							{ data: 'amos_pcend_cada_iden' },
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
							{ data: 'amos_pcend_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_pcend_cada_result', render: function(d) {
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
							{ data: 'amos_pcend_cada_qtde', visible: false },
							{ data: 'amos_pcend_cada_obs', visible: false },
							{ data: 'amos_pcend_cada_fina_data', visible: false },
							{ data: 'amos_pcend_cada_fina_usua_iden', visible: false },
							{ data: 'amos_cada_iden', visible: false },
							{ data: 'amos_cada_tenan', visible: false },
							{ data: 'amos_cada_empre', visible: false },
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
							if ( data[ 'amos_pcend_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_pcend_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_pcend_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_pcend_cada_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabPcend' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabPcend" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListPcend" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-cube"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListPcend" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenPcend" value="Automatico" disabled>' +
								'<label for="IdenPcend">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisPcend" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisPcend">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGPcend" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGPcend">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSPcend" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSPcend">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="CliePcend" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="CliePcend">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrPcend" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrPcend">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MatePcend" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MatePcend">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaPcend" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaPcend">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrPcend" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrPcend">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LocaPcend" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaPcend">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulPcend" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulPcend">Resultado P.C.E</label>' +
								'<div class="invalid-feedback">' +
									'Resultado P.C.E não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdePcend" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdePcend">Quantidade</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObsePcend" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObsePcend">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaPcend">' +
								'<label class="form-check-label" for="FinaPcend">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaPcend" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaPcend">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutPcend">Executado Por</label>' +
								'<select class="form-select" id="ExcutPcend" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexPcend" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnPcend" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTablePcend" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataPcend">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvPcend" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechPcend"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabPcend' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListPcend' ) );
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
	static GetEdtPcend( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormPcend' ], function( ResObjPai ){
			Pcend.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO P. CAMADA ENDURECIDA', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Pcend/GetUsuaPcend/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutPcend' ), Resposta.registros, function(){
						if ( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvPcend' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_iden' ) );
						$( ResObjPai ).find( '#EmisPcend' ).val( Core.Data( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#CliePcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MatePcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#ResulPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdePcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdePcend' ), 'INTEIRO' );
						$( ResObjPai ).find( '#ObsePcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_obs' ) )
						$( ResObjPai ).find( '#FinaPcend' ).prop( 'checked', false );
						if ( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaPcend' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaPcend' ).val( '' );
						$( ResObjPai ).find( '#ExcutPcend' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaPcend' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaPcend' ).val( Core.Data( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutPcend' ).val( Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_pcend_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaPcend' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutPcend' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaPcend' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutPcend' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaPcend', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTablePcend' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenPcend' ).val(),
								'anexo_ensa_tabe': 'PCEND',
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
	static GetClosePcend( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListPcend', 'EdtListPcend' ], function( ResObjPai ){
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
	static SetSalvPcend( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListPcend', 'EdtListPcend' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTablePcend' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_iden' ),
								IdenPcend: $( ResObjPai ).find( '#IdenPcend' ).val(),
								ResulPcend: $( ResObjPai ).find( '#ResulPcend' ).val(),
								QtdePcend: $( ResObjPai ).find( '#QtdePcend' ).val(),
								ObsePcend: $( ResObjPai ).find( '#ObsePcend' ).val(),
								FinaPcend: $( ResObjPai ).find( '#FinaPcend' ).is( ':checked' ),
								DatFinaPcend: $( ResObjPai ).find( '#DatFinaPcend' ).val(),
								ExcutPcend: $( ResObjPai ).find( '#ExcutPcend' ).val(),
								anexo_ensa_tabe: 'PCEND',
								AnexosPcend: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Pcend/SetSalvPcend/', function( vRespAjax ){
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
	static SetImprePcend( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Pcend/SetImprePcend/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};