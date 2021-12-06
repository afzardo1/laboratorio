/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel tração
 * do sistema
 *
 * @package    Tracao
 * @author     Alexandre Farinelli Zardo
*/
export default class Tracao {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableTrac( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_tracao_cada_iden':
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
			case 'amos_tracao_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_tracao_cada_result':
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
			case 'amos_tracao_cada_qtde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_tracao_cada_limi_resist':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_tracao_cada_limi_escoa':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_tracao_cada_along':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_tracao_cada_redu_area':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_tracao_cada_area':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_tracao_cada_aeo':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_tracao_cada_aef':
				return vTabela.cell( vLinha, 20 ).data();
				break;
			case 'amos_tracao_cada_ra':
				return vTabela.cell( vLinha, 21 ).data();
				break;
			case 'amos_tracao_cada_lo':
				return vTabela.cell( vLinha, 22 ).data();
				break;
			case 'amos_tracao_cada_lf':
				return vTabela.cell( vLinha, 23 ).data();
				break;
			case 'amos_tracao_cada_al':
				return vTabela.cell( vLinha, 24 ).data();
				break;
			case 'amos_tracao_cada_obs':
				return vTabela.cell( vLinha, 25 ).data();
				break;
			case 'amos_tracao_cada_fina_data':
				return vTabela.cell( vLinha, 26 ).data();
				break;
			case 'amos_tracao_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 27 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 28 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 29 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 30 ).data();
				break;
			case 'amos_cada_tipo':
				return vTabela.cell( vLinha, 31 ).data();
				break;
		};
	};s

	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * @param  vResp - Calback
	 * @return Calback
	 * @access public
	*/
	static GetTableTrac( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Tracao/GetTrac/', function( vRespAjax ){
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
							{ data: 'amos_tracao_cada_boto' },
							{ data: 'amos_tracao_cada_iden' },
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
							{ data: 'amos_tracao_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_tracao_cada_result', render: function(d) {
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
							{ data: 'amos_tracao_cada_qtde', visible: false },
							{ data: 'amos_tracao_cada_limi_resist', visible: false },
							{ data: 'amos_tracao_cada_limi_escoa', visible: false },
							{ data: 'amos_tracao_cada_along', visible: false },
							{ data: 'amos_tracao_cada_redu_area', visible: false },
							{ data: 'amos_tracao_cada_area', visible: false },
							{ data: 'amos_tracao_cada_aeo', visible: false },
							{ data: 'amos_tracao_cada_aef', visible: false },
							{ data: 'amos_tracao_cada_ra', visible: false },
							{ data: 'amos_tracao_cada_lo', visible: false },
							{ data: 'amos_tracao_cada_lf', visible: false },
							{ data: 'amos_tracao_cada_al', visible: false },
							{ data: 'amos_tracao_cada_obs', visible: false },
							{ data: 'amos_tracao_cada_fina_data', visible: false },
							{ data: 'amos_tracao_cada_fina_usua_iden', visible: false },
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
							if ( data[ 'amos_tracao_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_tracao_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_tracao_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_tracao_cada_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabTrac' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabTrac" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListTrac" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-arrows-alt-v"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListTrac" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenTrac" value="Automatico" disabled>' +
								'<label for="IdenTrac">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisTrac" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisTrac">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGTrac" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGTrac">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSTrac" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSTrac">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieTrac" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieTrac">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrTrac" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrTrac">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateTrac" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateTrac">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaTrac" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaTrac">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrTrac" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrTrac">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LocaTrac" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaTrac">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="TipoTrac" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="TipoTrac">Tipo Tração</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulTrac" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulTrac">Resultado Tração</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Tração não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeTrac" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeTrac">Quantidade</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LimResiTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="LimResiTrac">Lim. Resist.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LimEscoTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="LimEscoTrac">Lim. Escoa</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AlonTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="AlonTrac">Along.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ReduAreTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="ReduAreTrac">Redução de Área</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaAnaTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="AreaAnaTrac">Área (mm2)</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AEOTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="AEOTrac">AEO (mm)</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AEfTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="AEfTrac">AEf (mm)</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RATrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="RATrac">R.A. (%)</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LOTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="LOTrac">LO (mm)</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LfTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="LfTrac">Lf (mm)</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ALTrac" value="" placeholder="" maxlength="80">' +
								'<label class="form-label" for="ALTrac">AL (%)</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseTrac" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseTrac">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaTrac">' +
								'<label class="form-check-label" for="FinaTrac">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaTrac" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaTrac">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutTrac">Executado Por</label>' +
								'<select class="form-select" id="ExcutTrac" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexTrac" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnTrac" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableTrac" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataTrac">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvTrac" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechTrac"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabTrac' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListTrac' ) );
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
	static GetEdtTrac( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormTrac' ], function( ResObjPai ){
			Tracao.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO TRAÇÃO', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Tracao/GetUsuaTrac/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutTrac' ), Resposta.registros, function(){
						if ( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvTrac' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_iden' ) );
						$( ResObjPai ).find( '#EmisTrac' ).val( Core.Data( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#TipoTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_tipo' ) );
						$( ResObjPai ).find( '#ResulTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeTrac' ), 'INTEIRO' );
						$( ResObjPai ).find( '#LimResiTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_limi_resist' ) );
						$( ResObjPai ).find( '#LimEscoTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_limi_escoa' ) );
						$( ResObjPai ).find( '#AlonTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_along' ) );
						$( ResObjPai ).find( '#ReduAreTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_redu_area' ) );
						$( ResObjPai ).find( '#AreaAnaTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_area' ) );
						$( ResObjPai ).find( '#AEOTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_aeo' ) );
						$( ResObjPai ).find( '#AEfTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_aef' ) );
						$( ResObjPai ).find( '#RATrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_ra' ) );
						$( ResObjPai ).find( '#LOTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_lo' ) );
						$( ResObjPai ).find( '#LfTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_lf' ) );
						$( ResObjPai ).find( '#ALTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_al' ) );	
						$( ResObjPai ).find( '#ObseTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_obs' ) )
						$( ResObjPai ).find( '#FinaTrac' ).prop( 'checked', false );
						if ( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaTrac' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaTrac' ).val( '' );
						$( ResObjPai ).find( '#ExcutTrac' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaTrac' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaTrac' ).val( Core.Data( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutTrac' ).val( Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_tracao_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaTrac' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutTrac' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaTrac' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutTrac' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaTrac', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableTrac' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenTrac' ).val(),
								'anexo_ensa_tabe': 'TRACAO',
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
	static GetCloseTrac( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListTrac', 'EdtListTrac' ], function( ResObjPai ){
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
	static SetSalvTrac( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListTrac', 'EdtListTrac' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableTrac' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_iden' ),
								IdenTrac: $( ResObjPai ).find( '#IdenTrac' ).val(),
								ResulTrac: $( ResObjPai ).find( '#ResulTrac' ).val(),
								QtdeTrac: $( ResObjPai ).find( '#QtdeTrac' ).val(),
								LimResiTrac: $( ResObjPai ).find( '#LimResiTrac' ).val(),
								LimEscoTrac: $( ResObjPai ).find( '#LimEscoTrac' ).val(),
								AlonTrac: $( ResObjPai ).find( '#AlonTrac' ).val(),
								ReduAreTrac: $( ResObjPai ).find( '#ReduAreTrac' ).val(),
								AreaAnaTrac: $( ResObjPai ).find( '#AreaAnaTrac' ).val(),
								AEOTrac: $( ResObjPai ).find( '#AEOTrac' ).val(),
								AEfTrac: $( ResObjPai ).find( '#AEfTrac' ).val(),
								RATrac: $( ResObjPai ).find( '#RATrac' ).val(),
								LOTrac: $( ResObjPai ).find( '#LOTrac' ).val(),
								LfTrac: $( ResObjPai ).find( '#LfTrac' ).val(),
								ALTrac: $( ResObjPai ).find( '#ALTrac' ).val(),
								ObseTrac: $( ResObjPai ).find( '#ObseTrac' ).val(),
								FinaTrac: $( ResObjPai ).find( '#FinaTrac' ).is( ':checked' ),
								DatFinaTrac: $( ResObjPai ).find( '#DatFinaTrac' ).val(),
								ExcutTrac: $( ResObjPai ).find( '#ExcutTrac' ).val(),
								anexo_ensa_tabe: 'TRACAO',
								AnexosTrac: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Tracao/SetSalvTrac/', function( vRespAjax ){
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
	static SetImpreTrac( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Tracao/SetImpreTrac/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};