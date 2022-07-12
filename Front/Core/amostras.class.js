/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelas Amostras
 * do sistema
 *
 * @package    Amostras
 * @author     Alexandre Farinelli Zardo
*/
export default class Amostras {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableAmos( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		var vResultado = [
			'EM ANÁLISE',
			'REPROVADO',
			'INFORMATIVO',
			'TOLERÁVEL',
			'APROVADO',
		];
		switch ( vCampo ){ 
			case 'amos_cada_iden':
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
			case 'amos_cada_stat':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_cada_situ':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'amos_cada_clie_iden':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'amos_cada_fabr_iden':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'amos_cada_mate_iden':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'amos_cada_area_iden':
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'amos_cada_usua_iden':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'amos_cada_corde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_cada_priori':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_cada_conta':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_cada_distri':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_cada_obser':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_cada_metalo':
				if ( vTabela.cell( vLinha, 18 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_quimica':
				if ( vTabela.cell( vLinha, 19 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_tracao_1':
				if ( vTabela.cell( vLinha, 20 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_tracao_2':
				if ( vTabela.cell( vLinha, 21 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_dureza':
				if ( vTabela.cell( vLinha, 22 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_charp':
				if ( vTabela.cell( vLinha, 23 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_achat_expan':
				if ( vTabela.cell( vLinha, 24 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_pce':
				if ( vTabela.cell( vLinha, 25 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_dobram_2cps':
				if ( vTabela.cell( vLinha, 26 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_dobram_4cps':
				if ( vTabela.cell( vLinha, 27 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_macrog':
				if ( vTabela.cell( vLinha, 28 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_campo_metalo':
				if ( vTabela.cell( vLinha, 29 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_campo_quimica':
				if ( vTabela.cell( vLinha, 30 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_forne_tracao':
				if ( vTabela.cell( vLinha, 31 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_forne_dureza':
				if ( vTabela.cell( vLinha, 32 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_forne_charp':
				if ( vTabela.cell( vLinha, 33 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 34 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 35 ).data();
				break;
			case 'usua_cada_nome':
				return vTabela.cell( vLinha, 36 ).data();
				break;
			case 'amos_cada_achat_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 37 ).data() ) + 1 ];
				break;
			case 'amos_cada_expan_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 38 ).data() ) + 1 ];
				break;
			case 'amos_cada_charp_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 39 ).data() ) + 1 ];
				break;
			case 'amos_cada_dobram_2cps_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 40 ).data() ) + 1 ];
				break;
			case 'amos_cada_dobram_4cps_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 41 ).data() ) + 1 ];
				break;	
			case 'amos_cada_dureza_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 42 ).data() ) + 1 ];
				break;	
			case 'amos_cada_macrog_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 43 ).data() ) + 1 ];
				break;
			case 'amos_cada_metalo_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 44 ).data() ) + 1 ];
				break;
			case 'amos_cada_pce_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 45 ).data() ) + 1 ];
				break;
			case 'amos_cada_quimica_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 46 ).data() ) + 1 ];
				break;
			case 'amos_cada_forne_charp_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 47 ).data() ) + 1 ];
				break;
			case 'amos_cada_campo_metalo_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 48 ).data() ) + 1 ];
				break;
			case 'amos_cada_forne_dureza_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 49 ).data() ) + 1 ];
				break;
			case 'amos_cada_campo_quimica_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 50 ).data() ) + 1 ];
				break;
			case 'amos_cada_tracao_1_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 51 ).data() ) + 1 ];
				break;
			case 'amos_cada_tracao_2_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 52 ).data() ) + 1 ];
				break;
			case 'amos_cada_forne_tracao_final':
				return vResultado[ parseInt( vTabela.cell( vLinha, 53 ).data() ) + 1 ];
				break;	
			case 'amos_cada_concl_iden':
				return vTabela.cell( vLinha, 54 ).data();
				break;
			case 'amos_cada_concl_livre':
				return vTabela.cell( vLinha, 55 ).data();
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
	static GetTableAmos( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Amostras/GetAmos/', function( vRespAjax ){
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
							{ data: 'amos_cada_boto' },
							{ data: 'amos_cada_iden' },
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
							{ data: 'amos_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'AGUARDANDO';
								} else if ( d == 1 ) {
									return 'INICIADO';
								} else if ( d == 2 ) {
									return 'CONCLUÍDO';
								};
							} },
							{ data: 'amos_cada_situ', render: function(d) {
								if ( d == -1 ) {
									return 'SEM CONCLUSÃO';
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
							{ data: 'amos_cada_clie_iden', visible: false },
							{ data: 'amos_cada_fabr_iden', visible: false },
							{ data: 'amos_cada_mate_iden', visible: false },
							{ data: 'amos_cada_area_iden', visible: false },
							{ data: 'amos_cada_usua_iden', visible: false },
							{ data: 'amos_cada_corde', visible: false },
							{ data: 'amos_cada_priori', visible: false },
							{ data: 'amos_cada_conta', visible: false },
							{ data: 'amos_cada_distri', visible: false },
							{ data: 'amos_cada_obser', visible: false },
							{ data: 'amos_cada_metalo', visible: false },
							{ data: 'amos_cada_quimica', visible: false },
							{ data: 'amos_cada_tracao_1', visible: false },
							{ data: 'amos_cada_tracao_2', visible: false },
							{ data: 'amos_cada_dureza', visible: false },
							{ data: 'amos_cada_charp', visible: false },
							{ data: 'amos_cada_achat_expan', visible: false },
							{ data: 'amos_cada_pce', visible: false },
							{ data: 'amos_cada_dobram_2cps', visible: false },
							{ data: 'amos_cada_dobram_4cps', visible: false },
							{ data: 'amos_cada_macrog', visible: false },
							{ data: 'amos_cada_campo_metalo', visible: false },
							{ data: 'amos_cada_campo_quimica', visible: false },
							{ data: 'amos_cada_forne_tracao', visible: false },
							{ data: 'amos_cada_forne_dureza', visible: false },
							{ data: 'amos_cada_forne_charp', visible: false },
							{ data: 'amos_cada_tenan', visible: false },
							{ data: 'amos_cada_empre', visible: false },
							{ data: 'usua_cada_nome', visible: false },
							{ data: 'amos_cada_achat_final', visible: false },
							{ data: 'amos_cada_expan_final', visible: false },
							{ data: 'amos_cada_charp_final', visible: false },
							{ data: 'amos_cada_dobram_2cps_final', visible: false },
							{ data: 'amos_cada_dobram_4cps_final', visible: false },
							{ data: 'amos_cada_dureza_final', visible: false },
							{ data: 'amos_cada_macrog_final', visible: false },						
							{ data: 'amos_cada_metalo_final', visible: false },
							{ data: 'amos_cada_pce_final', visible: false },
							{ data: 'amos_cada_quimica_final', visible: false },
							{ data: 'amos_cada_forne_charp_final', visible: false },
							{ data: 'amos_cada_campo_metalo_final', visible: false },
							{ data: 'amos_cada_forne_dureza_final', visible: false },
							{ data: 'amos_cada_campo_quimica_final', visible: false },
							{ data: 'amos_cada_tracao_1_final', visible: false },
							{ data: 'amos_cada_tracao_2_final', visible: false },
							{ data: 'amos_cada_forne_tracao_final', visible: false },
							{ data: 'amos_cada_concl_iden', visible: false },
							{ data: 'amos_cada_concl_livre', visible: false },
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
							if ( data[ 'usua_cada_status' ] == 0 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabAmos' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabAmos" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListAmos" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-fill-drip"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListAmos" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanAmos">Tenant</label>' +
								'<select class="form-select" id="TenanAmos" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreAmos">Empresa</label>' +
								'<select class="form-select" id="EmpreAmos" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenAmos" value="Automatico" disabled>' +
								'<label for="IdenAmos">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisAmos" value="" placeholder="" maxlength="10" data-obriga="S">' +
								'<label for="EmisAmos">Emissão</label>' +
								'<div class="invalid-feedback">' +
									'Emissão não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGAmos" value="" placeholder="" maxlength="30">' +
								'<label for="RGAmos">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSAmos" value="" placeholder="" maxlength="30">' +
								'<label for="OSAmos">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ClieAmos">Cliente</label>' +
								'<select class="form-select" id="ClieAmos" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="FabrAmos">Fabricante</label>' +
								'<select class="form-select" id="FabrAmos" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="MateAmos">Material</label>' +
								'<select class="form-select" id="MateAmos" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="AreaAmos">Área</label>' +
								'<select class="form-select" id="AreaAmos" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrAmos" style="height: 100px" data-obriga="S"></textarea>' +
								'<label class="form-label" for="DescrAmos">Descrição da Amostra</label>' +
								'<div class="invalid-feedback">' +
									'Descrição não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="PrioAmos">Prioridade</label>' +
								'<select class="form-select" id="PrioAmos" aria-label="Floating label select example" required uppercase>' +
									'<option value="0">ALTA</option>' +
									'<option value="1">MÉDIA</option>' +
									'<option value="2" selected>BAIXA</option>' +
								'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-9">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="CadaPorAmos" data-value="" value="" placeholder="" maxlength="100" disabled>' +
								'<label for="CadaPorAmos">Cadastrado Por</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="CordeAmos" value="" placeholder="" maxlength="10" data-obriga="S">' +
								'<label for="CordeAmos">Data Cordenação</label>' +
								'<div class="invalid-feedback">' +
									'Data cordenação não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-9">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ContaAmos" value="" placeholder="" maxlength="100">' +
								'<label for="ContaAmos">Contato</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DistrAmos" style="height: 100px"></textarea>' +
  								'<label for="DistrAmos">Lista de Distribuição E-Mail</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObsAmos" style="height: 100px"></textarea>' +
  								'<label for="ObsAmos">Observações</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div id ="EnsaAnaliAmos" class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="card">' +
								'<div class="card-header"> '+
									'<div class="row" >' +
										'<div class="col-xl-4">' +
											'<i class="fas fa-fill-drip"></i> Ensaios / Análises' +
										'</div>' +
										'<div class="col-xl-4">' +
											'<i class="fas fa-check"></i> Resultados' +
										'</div>' +
									'</div>' +	
								'</div>' +
								'<div class="row p-3" >' +
									'<div class="col-xl-12">' +
										'<ul class="list-group list-group-flush">' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="AchatExpanEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Achatamento Expansão' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<div class="row" >' +
															'<div class="col-xl-6">' +
																'<span id="ResulAchatEnsaAmos"></span>' +
															'</div>' +
															'<div class="col-xl-6">' +
																'<span id="ResulExpanEnsaAmos"></span>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="CharpEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Charpy' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulCharpEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +	
														'<input id="Dobram2EnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'DOBRAM 2 CPs' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulDobram2EnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="Dobram4EnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'DOBRAM 4 CPs' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulDobram4EnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="DureEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Dureza' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulDureEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="MacroEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Macrografia' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulMacroEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="MetaEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Metalogarafico' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulMetaEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="TPCEEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'PCE' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulTPCEEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +	
														'<input id="QuimiEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Quimico' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulQuimiEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="Trac1EnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Tração 1º' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulTrac1EnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="Trac2EnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Tração 2º' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulTrac2EnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="CharpForneEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Charpy no Fabricante' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulCharpForneEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="DureForneEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Dureza no Fabricante' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulDureForneEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="MetaCampoEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Metalografico em Campo' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulMetaCampoEnsaAmos"></span>' +
													'</div>' +
												'</div>' +	
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="QuimiCampoEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Quimico em Campo' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulQuimiCampoEnsaAmos"></span>' +
													'</div>' +
												'</div>' +	
											'</li>' +
											'<li class="list-group-item ps-5">' +
												'<div class="row" >' +
													'<div class="col-xl-4">' +
														'<input id="TracaForneEnsaAmos" class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
														'Tração no Fabricante' +
													'</div>' +
													'<div class="col-xl-4">' +
														'<span id="ResulTracaForneEnsaAmos"></span>' +
													'</div>' +
												'</div>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</div>' +		
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-4">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ConclAobsAmos">Conclusões Padrão</label>' +
								'<select class="form-select" id="ConclAobsAmos" aria-label="Floating label select example" uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-8">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ConclAobsLivrAmos" style="height: 100px"></textarea>' +
  								'<label for="ConclAobsLivrAmos">Conclusões / Observações Livre</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvAmos" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechAmos"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabAmos' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListAmos' ) );
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
	static GetAddAmos( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormAmos' ], function( ResObjPai ){
			Amostras.GetForm( ResObjPai, 'Add', 'INCLUSÃO AMOSTRA', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Laboratorio/Amostras/GetTenanAmos/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanAmos' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanAmos' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanAmos' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanAmos' ).val(),
						  } }, '../../Laboratorio/Amostras/GetEmpreAmos/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreAmos' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreAmos' ).prop( 'disabled', true );
								};
								Core.SetAjax( { evento: {
									clie_cada_stat: '1',
									clie_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
									clie_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
								  } }, '../../Laboratorio/Amostras/GetClieAmos/', function( Resposta ){
									Core.SetSele2( $( ResObjPai ).find( '#ClieAmos' ), Resposta.registros, function(){
										Core.SetAjax( { evento: {
											fabr_cada_stat: '1',
											fabr_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
											fabr_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
										  } }, '../../Laboratorio/Amostras/GetFabrAmos/', function( Resposta ){
											Core.SetSele2( $( ResObjPai ).find( '#FabrAmos' ), Resposta.registros, function(){
												Core.SetAjax( { evento: {
													mate_cada_tenant_iden: $( ResObjPai ).find( '#TenanAmos' ).val(),
													mate_cada_empre_iden: $( ResObjPai ).find( '#EmpreAmos' ).val(),
												  } }, '../../Laboratorio/Amostras/GetMateAmos/', function( Resposta ){
													Core.SetSele2( $( ResObjPai ).find( '#MateAmos' ), Resposta.registros, function(){
														Core.SetAjax( { evento: {
															area_cada_stat: '1',
															area_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
															area_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
														  } }, '../../Laboratorio/Amostras/GetAreaAmos/', function( Resposta ){
															Core.SetSele2( $( ResObjPai ).find( '#AreaAmos' ), Resposta.registros, function(){
																Core.SetAjax( { evento: {
																	labo_amos_concl_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
																	labo_amos_concl_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
																} }, '../../Laboratorio/Amostras/GetConclAmos/', function( Resposta ){
																	Core.SetSele2( $( ResObjPai ).find( '#ConclAobsAmos' ), Resposta.registros, function(){
																		Core.SetMask( $( ResObjPai ).find( '#EmisAmos, #CordeAmos' ), 'DATA' );
																		$( ResObjPai ).find( '#CadaPorAmos' ).attr( 'data-value', Core.Login.GetUsuaSess( 'usua_cada_iden' ) );
																		$( ResObjPai ).find( '#CadaPorAmos' ).val ( Core.Login.GetUsuaSess( 'usua_cada_nome' ) );
																		$( ResObjPai ).find( '#EmisAmos' ).val ( Core.Data().format('L') );
																		$( ResObjPai ).find( '#CordeAmos' ).val ( Core.Data().add( 10, 'days' ).format('L') );
																		setTimeout( function(){
																			vResp( ResObjPai );
																		}, 300);
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
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
	static GetEdtAmos( VThis, vResp ) {
		//.prop( 'checked', true );
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormAmos' ], function( ResObjPai ){
			Amostras.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO ÁREA', function( ResObjPai ){
				if ( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_stat' ) == 1 ){
					$( ResObjPai ).find( '#SalvAmos' ).css( { 'display':'none' } );
				};
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Amostras/GetTenanAmos/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanAmos' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tenan' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanAmos' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '%%',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanAmos' ).val(),
						  } }, '../../Laboratorio/Amostras/GetEmpreAmos/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreAmos' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#EmpreAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreAmos' ).prop( 'disabled', true );
								};
								Core.SetAjax( { evento: {
									clie_cada_stat: '%%',
									clie_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
									clie_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
								  } }, '../../Laboratorio/Amostras/GetClieAmos/', function( Resposta ){
									Core.SetSele2( $( ResObjPai ).find( '#ClieAmos' ), Resposta.registros, function(){
										Core.SetAjax( { evento: {
											fabr_cada_stat: '%%',
											fabr_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
											fabr_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
										  } }, '../../Laboratorio/Amostras/GetFabrAmos/', function( Resposta ){
											Core.SetSele2( $( ResObjPai ).find( '#FabrAmos' ), Resposta.registros, function(){
												Core.SetAjax( { evento: {
													mate_cada_tenant_iden: $( ResObjPai ).find( '#TenanAmos' ).val(),
													mate_cada_empre_iden: $( ResObjPai ).find( '#EmpreAmos' ).val(),
												  } }, '../../Laboratorio/Amostras/GetMateAmos/', function( Resposta ){
													Core.SetSele2( $( ResObjPai ).find( '#MateAmos' ), Resposta.registros, function(){
														Core.SetAjax( { evento: {
															area_cada_stat: '%%',
															area_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
															area_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
														  } }, '../../Laboratorio/Amostras/GetAreaAmos/', function( Resposta ){
															Core.SetSele2( $( ResObjPai ).find( '#AreaAmos' ), Resposta.registros, function(){
																Core.SetAjax( { evento: {
																	labo_amos_concl_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
																	labo_amos_concl_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
																} }, '../../Laboratorio/Amostras/GetConclAmos/', function( Resposta ){
																	Core.SetSele2( $( ResObjPai ).find( '#ConclAobsAmos' ), Resposta.registros, function(){
																		Core.SetMask( $( ResObjPai ).find( '#EmisAmos, #CordeAmos' ), 'DATA' );
																		$( ResObjPai ).find( '#IdenAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_iden' ) );
																		$( ResObjPai ).find( '#EmisAmos' ).val( Core.Data( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_emis' ) ).format('L') );
																		$( ResObjPai ).find( '#RGAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_regi' ) );
																		$( ResObjPai ).find( '#OSAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_orse' ) );
																		$( ResObjPai ).find( '#ClieAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_clie_iden' ) ).trigger( 'change' );
																		$( ResObjPai ).find( '#FabrAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_fabr_iden' ) ).trigger( 'change' );
																		$( ResObjPai ).find( '#MateAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_mate_iden' ) ).trigger( 'change' );
																		$( ResObjPai ).find( '#AreaAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_area_iden' ) ).trigger( 'change' );
																		$( ResObjPai ).find( '#DescrAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_descr' ) );
																		$( ResObjPai ).find( '#PrioAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_priori' ) );
																		$( ResObjPai ).find( '#CadaPorAmos' ).attr( 'data-value', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_usua_iden' ) );
																		$( ResObjPai ).find( '#CadaPorAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'usua_cada_nome' ) );
																		$( ResObjPai ).find( '#CordeAmos' ).val( Core.Data( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_corde' ) ).format('L') );
																		$( ResObjPai ).find( '#ContaAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_conta' ) );
																		$( ResObjPai ).find( '#DistrAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_distri' ) ),
																		$( ResObjPai ).find( '#ObsAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_obser' ) ),
																		$( ResObjPai ).find( '#MetaEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_metalo' ) );
																		$( ResObjPai ).find( '#ResulMetaEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_metalo_final' ) );
																		$( ResObjPai ).find( '#QuimiEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_quimica' ) );
																		$( ResObjPai ).find( '#ResulQuimiEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_quimica_final' ) );
																		$( ResObjPai ).find( '#Trac1EnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tracao_1' ) );
																		$( ResObjPai ).find( '#ResulTrac1EnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tracao_1_final' ) );
																		$( ResObjPai ).find( '#Trac2EnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tracao_2' ) );
																		$( ResObjPai ).find( '#ResulTrac2EnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tracao_2_final' ) );
																		$( ResObjPai ).find( '#DureEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dureza' ) );
																		$( ResObjPai ).find( '#ResulDureEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dureza_final' ) );
																		$( ResObjPai ).find( '#CharpEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_charp' ) );
																		$( ResObjPai ).find( '#ResulCharpEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_charp_final' ) );
																		$( ResObjPai ).find( '#AchatExpanEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_achat_expan' ) );
																		$( ResObjPai ).find( '#ResulAchatEnsaAmos' ).html( 'Achatamento: ' + Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_achat_final' ) );
																		$( ResObjPai ).find( '#ResulExpanEnsaAmos' ).html( 'Expanção: ' + Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_expan_final' ) );
																		$( ResObjPai ).find( '#TPCEEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_pce' ) );
																		$( ResObjPai ).find( '#ResulTPCEEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_pce_final' ) );
																		$( ResObjPai ).find( '#Dobram2EnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dobram_2cps' ) );
																		$( ResObjPai ).find( '#ResulDobram2EnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dobram_2cps_final' ) );
																		$( ResObjPai ).find( '#Dobram4EnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dobram_4cps' ) );
																		$( ResObjPai ).find( '#ResulDobram4EnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_dobram_4cps_final' ) );
																		$( ResObjPai ).find( '#MacroEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_macrog' ) );
																		$( ResObjPai ).find( '#ResulMacroEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_macrog_final' ) );
																		$( ResObjPai ).find( '#QuimiCampoEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_campo_quimica' ) );
																		$( ResObjPai ).find( '#ResulQuimiCampoEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_campo_quimica_final' ) );
																		$( ResObjPai ).find( '#MetaCampoEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_campo_metalo' ) );
																		$( ResObjPai ).find( '#ResulMetaCampoEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_campo_metalo_final' ) );
																		$( ResObjPai ).find( '#TracaForneEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_tracao' ) );
																		$( ResObjPai ).find( '#ResulTracaForneEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_tracao_final' ) );
																		$( ResObjPai ).find( '#DureForneEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_dureza' ) );
																		$( ResObjPai ).find( '#ResulDureForneEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_dureza_final' ) );
																		$( ResObjPai ).find( '#CharpForneEnsaAmos' ).prop( 'checked', Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_charp' ) );
																		$( ResObjPai ).find( '#ResulCharpForneEnsaAmos' ).html( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_forne_charp_final' ) );
																		$( ResObjPai ).find( '#ConclAobsAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_concl_iden' ) ).trigger( 'change' );
																		$( ResObjPai ).find( '#ConclAobsLivrAmos' ).val( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_concl_livre' ) );
																		setTimeout( function(){
																			vResp( ResObjPai );
																		}, 300);
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
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
	static GetCloseAmos( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
			$( '#' + $( ResObjPai ).attr( 'id' ).replace( 'List', 'Tab' ) ).remove();
			$( ResObjPai ).remove();
			vResp( ResObjPai );
		});
	};

	/**
	 * Método para validar selecão de pelo menos
	 * 1 ensaio no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetValiEnsaAmos( VResObjPai, vResp ) {
		var ResulVali = false;
		$( VResObjPai ).find( '#EnsaAnaliAmos' ).find('input').each( function( RegIde ){
			if ( $( this ).is( ':checked' ) == true ) {
				ResulVali = true;
			};
		}); 
		setTimeout( function(){
			vResp( ResulVali );
		}, 300);	
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
	static SetSalvAmos( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
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
					Amostras.GetValiEnsaAmos( ResObjPai, function( ResulValiEnsaAmos  ){
						if ( ResulValiEnsaAmos == false ){
							Core.SetMensMenu( 'Manutenção de Amostras', 'Selecione pelo menos 1 Ensaio / Análise', 'AVISO')
							Core.MensMenu.show();
							setTimeout( function(){
								vResp( { vResObjPai: ResObjPai, vRespAjax: null } );
							}, 300);
						} else {
							Core.SetAjax({
								evento:{
									IdenAmos: $( ResObjPai ).find( '#IdenAmos' ).val(),
									EmisAmos: $( ResObjPai ).find( '#EmisAmos' ).val(),
									RGAmos: $( ResObjPai ).find( '#RGAmos' ).val(),
									OSAmos: $( ResObjPai ).find( '#OSAmos' ).val(),
									ClieAmos: $( ResObjPai ).find( '#ClieAmos' ).val(),
									FabrAmos: $( ResObjPai ).find( '#FabrAmos' ).val(),
									MateAmos: $( ResObjPai ).find( '#MateAmos' ).val(),
									AreaAmos: $( ResObjPai ).find( '#AreaAmos' ).val(),
									DescrAmos: $( ResObjPai ).find( '#DescrAmos' ).val(),
									PrioAmos: $( ResObjPai ).find( '#PrioAmos' ).val(),
									CadaPorAmos: $( ResObjPai ).find( '#CadaPorAmos' ).attr( 'data-value' ),
									CordeAmos: $( ResObjPai ).find( '#CordeAmos' ).val(),
									ContaAmos: $( ResObjPai ).find( '#ContaAmos' ).val(),
									DistrAmos: $( ResObjPai ).find( '#DistrAmos' ).val(),
									ObsAmos: $( ResObjPai ).find( '#ObsAmos' ).val(),
									TenanAmos: $( ResObjPai ).find( '#TenanAmos' ).val(),
									EmpreAmos: $( ResObjPai ).find( '#EmpreAmos' ).val(),
									MetaEnsaAmos: $( ResObjPai ).find( '#MetaEnsaAmos' ).is( ':checked' ),
									QuimiEnsaAmos: $( ResObjPai ).find( '#QuimiEnsaAmos' ).is( ':checked' ),
									Trac1EnsaAmos: $( ResObjPai ).find( '#Trac1EnsaAmos' ).is( ':checked' ),
									Trac2EnsaAmos: $( ResObjPai ).find( '#Trac2EnsaAmos' ).is( ':checked' ),
									DureEnsaAmos: $( ResObjPai ).find( '#DureEnsaAmos' ).is( ':checked' ),
									CharpEnsaAmos: $( ResObjPai ).find( '#CharpEnsaAmos' ).is( ':checked' ),
									AchatExpanEnsaAmos: $( ResObjPai ).find( '#AchatExpanEnsaAmos' ).is( ':checked' ),
									TPCEEnsaAmos: $( ResObjPai ).find( '#TPCEEnsaAmos' ).is( ':checked' ),
									Dobram2EnsaAmos: $( ResObjPai ).find( '#Dobram2EnsaAmos' ).is( ':checked' ),
									Dobram4EnsaAmos: $( ResObjPai ).find( '#Dobram4EnsaAmos' ).is( ':checked' ),
									MacroEnsaAmos: $( ResObjPai ).find( '#MacroEnsaAmos' ).is( ':checked' ),
									QuimiCampoEnsaAmos: $( ResObjPai ).find( '#QuimiCampoEnsaAmos' ).is( ':checked' ),
									MetaCampoEnsaAmos: $( ResObjPai ).find( '#MetaCampoEnsaAmos' ).is( ':checked' ),
									TracaForneEnsaAmos: $( ResObjPai ).find( '#TracaForneEnsaAmos' ).is( ':checked' ),
									DureForneEnsaAmos: $( ResObjPai ).find( '#DureForneEnsaAmos' ).is( ':checked' ),
									CharpForneEnsaAmos: $( ResObjPai ).find( '#CharpForneEnsaAmos' ).is( ':checked' ),
									ConclAobsAmos: $( ResObjPai ).find( '#ConclAobsAmos' ).val(),
									ConclAobsLivrAmos: $( ResObjPai ).find( '#ConclAobsLivrAmos' ).val(),
								}},
								'../../Laboratorio/Amostras/SetSalvAmos/', function( vRespAjax ){
									Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
									Core.MensMenu.show();
									setTimeout( function(){
										vResp( { vResObjPai: ResObjPai, vRespAjax: vRespAjax } );
									}, 300);
								},
							);
						};
					})
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
	static SetDeleAmos( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenAmos: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_iden' ),
				RGAmos: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_regi' ),
			}},
			'../../Laboratorio/Amostras/SetDeleAmos/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
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
	static SetImpreAmos( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Amostras/SetImpreAmos/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};

	/**
	 * Método para imprimir certificado
	 * no sistema
	 * 
	 * @param  vFiltros - Dados Para filtrar
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetImpreCertAmos( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Amostras/SetImprCertAmos/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};