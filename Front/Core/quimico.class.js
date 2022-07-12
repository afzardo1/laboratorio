/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel Quimico
 * do sistema
 *
 * @package    Quimico
 * @author     Alexandre Farinelli Zardo
*/
export default class Quimico {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableQuimi( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_quimi_cada_iden':
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
			case 'amos_quimi_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_quimi_cada_result':
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
			case 'amos_quimi_cada_qtde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_quimi_cada_espe_C':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_quimi_cada_obti_C':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_quimi_cada_espe_Si':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_quimi_cada_obti_Si':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_quimi_cada_espe_Mn':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_quimi_cada_obti_Mn':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_quimi_cada_espe_P':
				return vTabela.cell( vLinha, 20 ).data();
				break;
			case 'amos_quimi_cada_obti_P':
				return vTabela.cell( vLinha, 21 ).data();
				break;
			case 'amos_quimi_cada_espe_S':
				return vTabela.cell( vLinha, 22 ).data();
				break;
			case 'amos_quimi_cada_obti_S':
				return vTabela.cell( vLinha, 23 ).data();
				break;
			case 'amos_quimi_cada_espe_Cr':
				return vTabela.cell( vLinha, 24 ).data();
				break;
			case 'amos_quimi_cada_obti_Cr':
				return vTabela.cell( vLinha, 25 ).data();
				break;
			case 'amos_quimi_cada_espe_Ni':
				return vTabela.cell( vLinha, 26 ).data();
				break;
			case 'amos_quimi_cada_obti_Ni':
				return vTabela.cell( vLinha, 27 ).data();
				break;
			case 'amos_quimi_cada_espe_Mo':
				return vTabela.cell( vLinha, 28 ).data();
				break;
			case 'amos_quimi_cada_obti_Mo':
				return vTabela.cell( vLinha, 29 ).data();
				break;
			case 'amos_quimi_cada_espe_Cu':
				return vTabela.cell( vLinha, 30 ).data();
				break;
			case 'amos_quimi_cada_obti_Cu':
				return vTabela.cell( vLinha, 31 ).data();
				break;
			case 'amos_quimi_cada_espe_Al':
				return vTabela.cell( vLinha, 32 ).data();
				break;
			case 'amos_quimi_cada_obti_Al':
				return vTabela.cell( vLinha, 33 ).data();
				break;
			case 'amos_quimi_cada_espe_Fe':
				return vTabela.cell( vLinha, 34 ).data();
				break;
			case 'amos_quimi_cada_obti_Fe':
				return vTabela.cell( vLinha, 35 ).data();
				break;
			case 'amos_quimi_cada_espe_V':
				return vTabela.cell( vLinha, 36 ).data();
				break;
			case 'amos_quimi_cada_obti_V':
				return vTabela.cell( vLinha, 37 ).data();
				break;
			case 'amos_quimi_cada_espe_Co':
				return vTabela.cell( vLinha, 38 ).data();
				break;
			case 'amos_quimi_cada_obti_Co':
				return vTabela.cell( vLinha, 39 ).data();
				break;
			case 'amos_quimi_cada_espe_Nb':
				return vTabela.cell( vLinha, 40 ).data();
				break;
			case 'amos_quimi_cada_obti_Nb':
				return vTabela.cell( vLinha, 41 ).data();
				break;
			case 'amos_quimi_cada_espe_Ti':
				return vTabela.cell( vLinha, 42 ).data();
				break;
			case 'amos_quimi_cada_obti_Ti':
				return vTabela.cell( vLinha, 43 ).data();
				break;
			case 'amos_quimi_cada_espe_W':
				return vTabela.cell( vLinha, 44 ).data();
				break;
			case 'amos_quimi_cada_obti_W':
				return vTabela.cell( vLinha, 45 ).data();
				break;
			case 'amos_quimi_cada_espe_Mg':
				return vTabela.cell( vLinha, 46 ).data();
				break;
			case 'amos_quimi_cada_obti_Mg':
				return vTabela.cell( vLinha, 47 ).data();
				break;
			case 'amos_quimi_cada_espe_Zn':
				return vTabela.cell( vLinha, 48 ).data();
				break;
			case 'amos_quimi_cada_obti_Zn':
				return vTabela.cell( vLinha, 49 ).data();
				break;
			case 'amos_quimi_cada_espe_Sb':
				return vTabela.cell( vLinha, 50 ).data();
				break;
			case 'amos_quimi_cada_obti_Sb':
				return vTabela.cell( vLinha, 51 ).data();
				break;
			case 'amos_quimi_cada_espe_Sn':
				return vTabela.cell( vLinha, 52 ).data();
				break;
			case 'amos_quimi_cada_obti_Sn':
				return vTabela.cell( vLinha, 53 ).data();
				break;
			case 'amos_quimi_cada_espe_Ca':
				return vTabela.cell( vLinha, 54 ).data();
				break;
			case 'amos_quimi_cada_obti_Ca':
				return vTabela.cell( vLinha, 55 ).data();
				break;
			case 'amos_quimi_cada_espe_Cl':
				return vTabela.cell( vLinha, 56 ).data();
				break;
			case 'amos_quimi_cada_obti_Cl':
				return vTabela.cell( vLinha, 57 ).data();
				break;
			case 'amos_quimi_cada_espe_N':
				return vTabela.cell( vLinha, 58 ).data();
				break;
			case 'amos_quimi_cada_obti_N':
				return vTabela.cell( vLinha, 59 ).data();
				break;
			case 'amos_quimi_cada_espe_Na':
				return vTabela.cell( vLinha, 60 ).data();
				break;
			case 'amos_quimi_cada_obti_Na':
				return vTabela.cell( vLinha, 61 ).data();
				break;
			case 'amos_quimi_cada_espe_Ceq':
				return vTabela.cell( vLinha, 62 ).data();
				break;
			case 'amos_quimi_cada_obti_Ceq':
				return vTabela.cell( vLinha, 63 ).data();
				break;
			case 'amos_quimi_cada_espe_Pb':
				return vTabela.cell( vLinha, 64 ).data();
				break;
			case 'amos_quimi_cada_obti_Pb':
				return vTabela.cell( vLinha, 65 ).data();
				break;
			case 'amos_quimi_cada_obs':
				return vTabela.cell( vLinha, 66 ).data();
				break;
			case 'amos_quimi_cada_fina':
				return vTabela.cell( vLinha, 67 ).data();
				break;
			case 'amos_quimi_cada_fina_data':
				return vTabela.cell( vLinha, 68 ).data();
				break;
			case 'amos_quimi_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 69 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 70 ).data();
				break;
			case 'mate_cada_C':
				return vTabela.cell( vLinha, 71 ).data();
				break;
			case 'mate_cada_Si':
				return vTabela.cell( vLinha, 72 ).data();
				break;
			case 'mate_cada_Mn':
				return vTabela.cell( vLinha, 73 ).data();
				break;
			case 'mate_cada_P':
				return vTabela.cell( vLinha, 74 ).data();
				break;
			case 'mate_cada_S':
				return vTabela.cell( vLinha, 75 ).data();
				break;
			case 'mate_cada_Cr':
				return vTabela.cell( vLinha, 76 ).data();
				break;
			case 'mate_cada_Ni':
				return vTabela.cell( vLinha, 77 ).data();
				break;
			case 'mate_cada_Mo':
				return vTabela.cell( vLinha, 78 ).data();
				break;
			case 'mate_cada_Cu':
				return vTabela.cell( vLinha, 79 ).data();
				break;
			case 'mate_cada_Al':
				return vTabela.cell( vLinha, 80 ).data();
				break;
			case 'mate_cada_Fe':
				return vTabela.cell( vLinha, 81 ).data();
				break;
			case 'mate_cada_V':
				return vTabela.cell( vLinha, 82 ).data();
				break;
			case 'mate_cada_Co':
				return vTabela.cell( vLinha, 83 ).data();
				break;
			case 'mate_cada_Nb':
				return vTabela.cell( vLinha, 84 ).data();
				break;
			case 'mate_cada_Ti':
				return vTabela.cell( vLinha, 85 ).data();
				break;
			case 'mate_cada_W':
				return vTabela.cell( vLinha, 86 ).data();
				break;
			case 'mate_cada_Mg':
				return vTabela.cell( vLinha, 87 ).data();
				break;
			case 'mate_cada_Zn':
				return vTabela.cell( vLinha, 88 ).data();
				break;
			case 'mate_cada_Pb':
				return vTabela.cell( vLinha, 89 ).data();
				break;
			case 'mate_cada_Sb':
				return vTabela.cell( vLinha, 90 ).data();
				break;
			case 'mate_cada_Sn':
				return vTabela.cell( vLinha, 91 ).data();
				break;
			case 'mate_cada_Ca':
				return vTabela.cell( vLinha, 92 ).data();
				break;
			case 'mate_cada_Cl':
				return vTabela.cell( vLinha, 93 ).data();
				break;
			case 'mate_cada_N':
				return vTabela.cell( vLinha, 94 ).data();
				break;
			case 'mate_cada_Na':
				return vTabela.cell( vLinha, 95 ).data();
				break;
			case 'mate_cada_Ceq':
				return vTabela.cell( vLinha, 96 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 97 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 98 ).data();
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
	static GetTableQuimi( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Quimico/GetQuimi/', function( vRespAjax ){
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
							{ data: 'amos_quimi_cada_boto' },
							{ data: 'amos_quimi_cada_iden' },
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
							{ data: 'amos_quimi_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_quimi_cada_result', render: function(d) {
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
							{ data: 'amos_quimi_cada_qtde', visible: false },
							{ data: 'amos_quimi_cada_espe_C', visible: false },
							{ data: 'amos_quimi_cada_obti_C', visible: false },
							{ data: 'amos_quimi_cada_espe_Si', visible: false },
							{ data: 'amos_quimi_cada_obti_Si', visible: false },
							{ data: 'amos_quimi_cada_espe_Mn', visible: false },
							{ data: 'amos_quimi_cada_obti_Mn', visible: false },
							{ data: 'amos_quimi_cada_espe_P', visible: false },
							{ data: 'amos_quimi_cada_obti_P', visible: false },							
							{ data: 'amos_quimi_cada_espe_S', visible: false },
							{ data: 'amos_quimi_cada_obti_S', visible: false },
							{ data: 'amos_quimi_cada_espe_Cr', visible: false },
							{ data: 'amos_quimi_cada_obti_Cr', visible: false },
							{ data: 'amos_quimi_cada_espe_Ni', visible: false },
							{ data: 'amos_quimi_cada_obti_Ni', visible: false },
							{ data: 'amos_quimi_cada_espe_Mo', visible: false },
							{ data: 'amos_quimi_cada_obti_Mo', visible: false },
							{ data: 'amos_quimi_cada_espe_Cu', visible: false },
							{ data: 'amos_quimi_cada_obti_Cu', visible: false },
							{ data: 'amos_quimi_cada_espe_Al', visible: false },
							{ data: 'amos_quimi_cada_obti_Al', visible: false },
							{ data: 'amos_quimi_cada_espe_Fe', visible: false },
							{ data: 'amos_quimi_cada_obti_Fe', visible: false },
							{ data: 'amos_quimi_cada_espe_V', visible: false },
							{ data: 'amos_quimi_cada_obti_V', visible: false },
							{ data: 'amos_quimi_cada_espe_Co', visible: false },
							{ data: 'amos_quimi_cada_obti_Co', visible: false },
							{ data: 'amos_quimi_cada_espe_Nb', visible: false },
							{ data: 'amos_quimi_cada_obti_Nb', visible: false },
							{ data: 'amos_quimi_cada_espe_Ti', visible: false },
							{ data: 'amos_quimi_cada_obti_Ti', visible: false },
							{ data: 'amos_quimi_cada_espe_W', visible: false },
							{ data: 'amos_quimi_cada_obti_W', visible: false },
							{ data: 'amos_quimi_cada_espe_Mg', visible: false },
							{ data: 'amos_quimi_cada_obti_Mg', visible: false },
							{ data: 'amos_quimi_cada_espe_Zn', visible: false },
							{ data: 'amos_quimi_cada_obti_Zn', visible: false },
							{ data: 'amos_quimi_cada_espe_Sb', visible: false },
							{ data: 'amos_quimi_cada_obti_Sb', visible: false },
							{ data: 'amos_quimi_cada_espe_Sn', visible: false },
							{ data: 'amos_quimi_cada_obti_Sn', visible: false },
							{ data: 'amos_quimi_cada_espe_Ca', visible: false },
							{ data: 'amos_quimi_cada_obti_Ca', visible: false },
							{ data: 'amos_quimi_cada_espe_Cl', visible: false },
							{ data: 'amos_quimi_cada_obti_Cl', visible: false },
							{ data: 'amos_quimi_cada_espe_N', visible: false },
							{ data: 'amos_quimi_cada_obti_N', visible: false },
							{ data: 'amos_quimi_cada_espe_Na', visible: false },
							{ data: 'amos_quimi_cada_obti_Na', visible: false },
							{ data: 'amos_quimi_cada_espe_Ceq', visible: false },
							{ data: 'amos_quimi_cada_obti_Ceq', visible: false },
							{ data: 'amos_quimi_cada_espe_Pb', visible: false },
							{ data: 'amos_quimi_cada_obti_Pb', visible: false },
							{ data: 'amos_quimi_cada_obs', visible: false },
							{ data: 'amos_quimi_cada_fina', visible: false },
							{ data: 'amos_quimi_cada_fina_data', visible: false },
							{ data: 'amos_quimi_cada_fina_usua_iden', visible: false },
							{ data: 'amos_cada_iden', visible: false },
							{ data: 'mate_cada_C', visible: false },
							{ data: 'mate_cada_Si', visible: false },
							{ data: 'mate_cada_Mn', visible: false },
							{ data: 'mate_cada_P', visible: false },
							{ data: 'mate_cada_S', visible: false },
							{ data: 'mate_cada_Cr', visible: false },
							{ data: 'mate_cada_Ni', visible: false },
							{ data: 'mate_cada_Mo', visible: false },
							{ data: 'mate_cada_Cu', visible: false },
							{ data: 'mate_cada_Al', visible: false },
							{ data: 'mate_cada_Fe', visible: false },
							{ data: 'mate_cada_V', visible: false },
							{ data: 'mate_cada_Co', visible: false },
							{ data: 'mate_cada_Nb', visible: false },
							{ data: 'mate_cada_Ti', visible: false },
							{ data: 'mate_cada_W', visible: false },
							{ data: 'mate_cada_Mg', visible: false },
							{ data: 'mate_cada_Zn', visible: false },
							{ data: 'mate_cada_Pb', visible: false },
							{ data: 'mate_cada_Sb', visible: false },
							{ data: 'mate_cada_Sn', visible: false },
							{ data: 'mate_cada_Ca', visible: false },
							{ data: 'mate_cada_Cl', visible: false },
							{ data: 'mate_cada_N', visible: false },
							{ data: 'mate_cada_Na', visible: false },
							{ data: 'mate_cada_Ceq', visible: false },
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
							if ( data[ 'amos_quimi_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_quimi_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_quimi_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_quimi_cada_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabQuimi' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabQuimi" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListQuimi" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-vials"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListQuimi" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenQuimi" value="Automatico" disabled>' +
								'<label for="IdenQuimi">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisQuimi" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisQuimi">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGQuimi" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGQuimi">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSQuimi" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSQuimi">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieQuimi" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieQuimi">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrQuimi" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrQuimi">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateQuimi" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateQuimi">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaQuimi" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaQuimi">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrQuimi" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrQuimi">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LocaQuimi" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaQuimi">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulQuimi" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulQuimi">Resultado Quimico</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Quimico não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeQuimi" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeQuimi">Quantidade</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCQuimi">Especificado C (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinSiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinSiQuimi">Especificado Si (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinMnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinMnQuimi">Especificado Mn (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinPQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinPQuimi">Especificado P (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCQuimi">Especificado C (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxSiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxSiQuimi">Especificado Si (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxMnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxMnQuimi">Especificado Mn (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxPQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxPQuimi">Especificado P (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCQuimi">Obtido C</label>' +
								'</div>' +
							'</div>' +						
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitSiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitSiQuimi">Obtido Si</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitMnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitMnQuimi">Obtido Mn</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitPQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitPQuimi">Obtido P</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinSQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinSQuimi">Especificado S (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCrQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCrQuimi">Especificado Cr (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinNiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinNiQuimi">Especificado Ni (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinMoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinMoQuimi">Especificado Mo (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxSQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxSQuimi">Especificado S (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCrQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCrQuimi">Especificado Cr (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxNiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxNiQuimi">Especificado Ni (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxMoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxMoQuimi">Especificado Mo (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitSQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitSQuimi">Obtido S</label>' +
								'</div>' +
							'</div>' +						
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCrQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCrQuimi">Obtido Cr</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitNiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitNiQuimi">Obtido Ni</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitMoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitMoQuimi">Obtido Mo</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCuQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCuQuimi">Especificado Cu (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinAlQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinAlQuimi">Especificado Al (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinFeQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinFeQuimi">Especificado Fe (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinVQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinVQuimi">Especificado V (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCuQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCuQuimi">Especificado Cu (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxAlQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxAlQuimi">Especificado Al (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxFeQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxFeQuimi">Especificado Fe (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxVQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxVQuimi">Especificado V (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCuQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCuQuimi">Obtido Cu</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitAlQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitAlQuimi">Obtido Al</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitFeQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitFeQuimi">Obtido Fe</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitVQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitVQuimi">Obtido V</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCoQuimi">Especificado Co (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinNbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinNbQuimi">Especificado Nb (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinTiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinTiQuimi">Especificado Ti (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinWQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinWQuimi">Especificado W (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCoQuimi">Especificado Co (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxNbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxNbQuimi">Especificado Nb (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxTiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxTiQuimi">Especificado Ti (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxWQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxWQuimi">Especificado W (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCoQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCoQuimi">Obtido Co</label>' +
								'</div>' +
							'</div>' +						
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitNbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitNbQuimi">Obtido Nb</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitTiQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitTiQuimi">Obtido Ti</label>' +
								'</div>' +
							'</div>' +						
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitWQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitWQuimi">Obtido W</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinMgQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinMgQuimi">Especificado Mg (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinZnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinZnQuimi">Especificado Zn (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinSbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinSbQuimi">Especificado Sb (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinSnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinSnQuimi">Especificado Sn (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxMgQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxMgQuimi">Especificado Mg (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxZnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxZnQuimi">Especificado Zn (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxSbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxSbQuimi">Especificado Sb (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxSnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxSnQuimi">Especificado Sn (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitMgQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitMgQuimi">Obtido Mg</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitZnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitZnQuimi">Obtido Zn</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitSbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitSbQuimi">Obtido Sb</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitSnQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitSnQuimi">Obtido Sn</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3">' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCaQuimi">Especificado Ca (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinNQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinNQuimi">Especificado N (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinClQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinClQuimi">Especificado Cl (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinNaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinNaQuimi">Especificado Na (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3">' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCaQuimi">Especificado Ca (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxNQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxNQuimi">Especificado N (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxClQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxClQuimi">Especificado Cl (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxNaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxNaQuimi">Especificado Na (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3">' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCaQuimi">Obtido Ca</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitNQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitNQuimi">Obtido N</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitClQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitClQuimi">Obtido Cl</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitNaQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitNaQuimi">Obtido Na</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3">' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinCeqQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinCeqQuimi">Especificado Ceq (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMinPbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMinPbQuimi">Especificado Pb (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3">' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxCeqQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxCeqQuimi">Especificado Ceq (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="EspeMaxPbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="EspeMaxPbQuimi">Especificado Pb (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3">' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitCeqQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitCeqQuimi">Obtido Ceq</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ObitPbQuimi" value="" placeholder="" maxlength="20">' +
									'<label class="form-label" for="ObitPbQuimi">Obtido Pb</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseQuimi" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseQuimi">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaQuimi">' +
								'<label class="form-check-label" for="FinaQuimi">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaQuimi" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaQuimi">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutQuimi">Executado Por</label>' +
								'<select class="form-select" id="ExcutQuimi" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexQuimi" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnQuimi" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableQuimi" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataQuimi">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvQuimi" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechQuimi"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabQuimi' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListQuimi' ) );
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
	static GetEdtQuimi( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormQuimi' ], function( ResObjPai ){
			Quimico.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO QUIMICO', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Quimico/GetUsuaQuimi/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutQuimi' ), Resposta.registros, function(){
						if ( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvQuimi' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_iden' ) );
						$( ResObjPai ).find( '#EmisQuimi' ).val( Core.Data( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#ResulQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeQuimi' ), 'INTEIRO' );
						$( ResObjPai ).find( '#EspeMinCQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_C' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinSiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Si' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinMnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mn' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinPQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_P' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_S' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinCrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cr' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinNiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ni' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinMoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mo' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinCuQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cu' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinAlQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Al' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinFeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Fe' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinVQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_V' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinCoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Co' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinNbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Nb' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinTiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ti' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinWQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_W' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinMgQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mg' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinZnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Zn' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinSbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Sb' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinSnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Sn' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinCaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ca' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinClQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cl' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinNQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_N' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinNaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Na' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinCeqQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ceq' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMinPbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Pb' ).split( '-' )[0] );
						$( ResObjPai ).find( '#EspeMaxCQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_C' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxSiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Si' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxMnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mn' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxPQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_P' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_S' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxCrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cr' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxNiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ni' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxMoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mo' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxCuQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cu' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxAlQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Al' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxFeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Fe' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxVQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_V' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxCoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Co' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxNbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Nb' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxTiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ti' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxWQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_W' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxMgQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Mg' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxZnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Zn' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxSbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Sb' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxSnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Sn' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxCaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ca' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxClQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Cl' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxNQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_N' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxNaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Na' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxCeqQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Ceq' ).split( '-' )[1] );
						$( ResObjPai ).find( '#EspeMaxPbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_espe_Pb' ).split( '-' )[1] );
						if ( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_iden' ) == 'Automatico' ){
							$( ResObjPai ).find( '#EspeMinCQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_C' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinSiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Si' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinMnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mn' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinPQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_P' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_S' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinCrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cr' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinNiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ni' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinMoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mo' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinCuQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cu' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinAlQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Al' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinFeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Fe' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinVQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_V' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinCoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Co' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinNbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Nb' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinTiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ti' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinWQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_W' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinMgQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mg' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinZnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Zn' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinPbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Pb' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinSbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Sb' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinSnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Sn' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinCaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ca' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinClQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cl' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinNQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_N' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinNaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Na' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMinCeqQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ceq' ).split( '-' )[0] );
							$( ResObjPai ).find( '#EspeMaxCQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_C' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxSiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Si' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxMnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mn' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxPQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_P' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_S' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxCrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cr' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxNiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ni' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxMoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mo' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxCuQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cu' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxAlQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Al' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxFeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Fe' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxVQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_V' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxCoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Co' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxNbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Nb' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxTiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ti' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxWQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_W' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxMgQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Mg' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxZnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Zn' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxPbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Pb' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxSbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Sb' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxSnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Sn' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxCaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ca' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxClQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Cl' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxNQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_N' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxNaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Na' ).split( '-' )[1] );
							$( ResObjPai ).find( '#EspeMaxCeqQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'mate_cada_Ceq' ).split( '-' )[1] );
						};
						$( ResObjPai ).find( '#ObitCQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_C' ) );
						$( ResObjPai ).find( '#ObitSiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Si' ) );
						$( ResObjPai ).find( '#ObitMnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Mn' ) );
						$( ResObjPai ).find( '#ObitPQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_P' ) );
						$( ResObjPai ).find( '#ObitSQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_S' ) );
						$( ResObjPai ).find( '#ObitCrQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Cr' ) );
						$( ResObjPai ).find( '#ObitNiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Ni' ) );
						$( ResObjPai ).find( '#ObitMoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Mo' ) );
						$( ResObjPai ).find( '#ObitCuQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Cu' ) );
						$( ResObjPai ).find( '#ObitAlQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Al' ) );
						$( ResObjPai ).find( '#ObitFeQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Fe' ) );
						$( ResObjPai ).find( '#ObitVQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_V' ) );
						$( ResObjPai ).find( '#ObitCoQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Co' ) );
						$( ResObjPai ).find( '#ObitNbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Nb' ) );
						$( ResObjPai ).find( '#ObitTiQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Ti' ) );
						$( ResObjPai ).find( '#ObitWQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_W' ) );
						$( ResObjPai ).find( '#ObitMgQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Mg' ) );
						$( ResObjPai ).find( '#ObitZnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Zn' ) );
						$( ResObjPai ).find( '#ObitSbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Sb' ) );
						$( ResObjPai ).find( '#ObitSnQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Sn' ) );
						$( ResObjPai ).find( '#ObitCaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Ca' ) );
						$( ResObjPai ).find( '#ObitClQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Cl' ) );
						$( ResObjPai ).find( '#ObitNQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_N' ) );
						$( ResObjPai ).find( '#ObitNaQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Na' ) );
						$( ResObjPai ).find( '#ObitCeqQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Ceq' ) );
						$( ResObjPai ).find( '#ObitPbQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_quimi_cada_obti_Pb' ) );
						$( ResObjPai ).find( '#ObseQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_dure_cada_obs' ) );
						$( ResObjPai ).find( '#FinaQuimi' ).prop( 'checked', false );
						if ( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_dure_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaQuimi' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaQuimi' ).val( '' );
						$( ResObjPai ).find( '#ExcutQuimi' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaQuimi' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaQuimi' ).val( Core.Data( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_dure_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutQuimi' ).val( Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_dure_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaQuimi' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutQuimi' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaQuimi' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutQuimi' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaQuimi', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableQuimi' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenQuimi' ).val(),
								'anexo_ensa_tabe': 'QUIMICO',
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
	static GetCloseQuimi( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListQuimi', 'EdtListQuimi' ], function( ResObjPai ){
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
	static SetSalvQuimi( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListQuimi', 'EdtListQuimi' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableQuimi' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_iden' ),
								IdenQuimi: $( ResObjPai ).find( '#IdenQuimi' ).val(),
								ResulQuimi: $( ResObjPai ).find( '#ResulQuimi' ).val(),
								QtdeQuimi: $( ResObjPai ).find( '#QtdeQuimi' ).val(),
								EspeCQuimi: $( ResObjPai ).find( '#EspeMinCQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCQuimi' ).val(),
								ObitCQuimi: $( ResObjPai ).find( '#ObitCQuimi' ).val(),
								EspeSiQuimi: $( ResObjPai ).find( '#EspeMinSiQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxSiQuimi' ).val(),
								ObitSiQuimi: $( ResObjPai ).find( '#ObitSiQuimi' ).val(),
								EspeMnQuimi: $( ResObjPai ).find( '#EspeMinMnQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxMnQuimi' ).val(),
								ObitMnQuimi: $( ResObjPai ).find( '#ObitMnQuimi' ).val(),
								EspePQuimi: $( ResObjPai ).find( '#EspeMinPQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxPQuimi' ).val(),
								ObitPQuimi: $( ResObjPai ).find( '#ObitPQuimi' ).val(),
								EspeSQuimi: $( ResObjPai ).find( '#EspeMinSQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxSQuimi' ).val(),
								ObitSQuimi: $( ResObjPai ).find( '#ObitSQuimi' ).val(),
								EspeCrQuimi: $( ResObjPai ).find( '#EspeMinCrQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCrQuimi' ).val(),
								ObitCrQuimi: $( ResObjPai ).find( '#ObitCrQuimi' ).val(),
								EspeNiQuimi: $( ResObjPai ).find( '#EspeMinNiQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxNiQuimi' ).val(),
								ObitNiQuimi: $( ResObjPai ).find( '#ObitNiQuimi' ).val(),
								EspeMoQuimi: $( ResObjPai ).find( '#EspeMinMoQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxMoQuimi' ).val(),
								ObitMoQuimi: $( ResObjPai ).find( '#ObitMoQuimi' ).val(),
								EspeCuQuimi: $( ResObjPai ).find( '#EspeMinCuQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCuQuimi' ).val(),
								ObitCuQuimi: $( ResObjPai ).find( '#ObitCuQuimi' ).val(),
								EspeAlQuimi: $( ResObjPai ).find( '#EspeMinAlQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxAlQuimi' ).val(),
								ObitAlQuimi: $( ResObjPai ).find( '#ObitAlQuimi' ).val(),
								EspeFeQuimi: $( ResObjPai ).find( '#EspeMinFeQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxFeQuimi' ).val(),
								ObitFeQuimi: $( ResObjPai ).find( '#ObitFeQuimi' ).val(),
								EspeVQuimi: $( ResObjPai ).find( '#EspeMinVQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxVQuimi' ).val(),
								ObitVQuimi: $( ResObjPai ).find( '#ObitVQuimi' ).val(),
								EspeCoQuimi: $( ResObjPai ).find( '#EspeMinCoQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCoQuimi' ).val(),
								ObitCoQuimi: $( ResObjPai ).find( '#ObitCoQuimi' ).val(),
								EspeNbQuimi: $( ResObjPai ).find( '#EspeMinNbQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxNbQuimi' ).val(),
								ObitNbQuimi: $( ResObjPai ).find( '#ObitNbQuimi' ).val(),
								EspeTiQuimi: $( ResObjPai ).find( '#EspeMinTiQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxTiQuimi' ).val(),
								ObitTiQuimi: $( ResObjPai ).find( '#ObitTiQuimi' ).val(),
								EspeWQuimi: $( ResObjPai ).find( '#EspeMinWQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxWQuimi' ).val(),
								ObitWQuimi: $( ResObjPai ).find( '#ObitWQuimi' ).val(),
								EspeMgQuimi: $( ResObjPai ).find( '#EspeMinMgQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxMgQuimi' ).val(),
								ObitMgQuimi: $( ResObjPai ).find( '#ObitMgQuimi' ).val(),
								EspeZnQuimi: $( ResObjPai ).find( '#EspeMinZnQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxZnQuimi' ).val(),
								ObitZnQuimi: $( ResObjPai ).find( '#ObitZnQuimi' ).val(),
								EspeSbQuimi: $( ResObjPai ).find( '#EspeMinSbQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxSbQuimi' ).val(),
								ObitSbQuimi: $( ResObjPai ).find( '#ObitSbQuimi' ).val(),
								EspePbQuimi: $( ResObjPai ).find( '#EspeMinPbQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxPbQuimi' ).val(),
								ObitPbQuimi: $( ResObjPai ).find( '#ObitPbQuimi' ).val(),
								EspeSnQuimi: $( ResObjPai ).find( '#EspeMinSnQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxSnQuimi' ).val(),
								ObitSnQuimi: $( ResObjPai ).find( '#ObitSnQuimi' ).val(),
								EspeCaQuimi: $( ResObjPai ).find( '#EspeMinCaQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCaQuimi' ).val(),
								ObitCaQuimi: $( ResObjPai ).find( '#ObitCaQuimi' ).val(),
								EspeClQuimi: $( ResObjPai ).find( '#EspeMinClQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxClQuimi' ).val(),
								ObitClQuimi: $( ResObjPai ).find( '#ObitClQuimi' ).val(),
								EspeNQuimi: $( ResObjPai ).find( '#EspeMinNQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxNQuimi' ).val(),
								ObitNQuimi: $( ResObjPai ).find( '#ObitNQuimi' ).val(),
								EspeNaQuimi: $( ResObjPai ).find( '#EspeMinNaQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxNaQuimi' ).val(),
								ObitNaQuimi: $( ResObjPai ).find( '#ObitNaQuimi' ).val(),
								EspeCeqQuimi: $( ResObjPai ).find( '#EspeMinCeqQuimi' ).val() + '-' + $( ResObjPai ).find( '#EspeMaxCeqQuimi' ).val(),
								ObitCeqQuimi: $( ResObjPai ).find( '#ObitCeqQuimi' ).val(),
								ObseQuimi: $( ResObjPai ).find( '#ObseQuimi' ).val(),
								FinaQuimi: $( ResObjPai ).find( '#FinaQuimi' ).is( ':checked' ),
								DatFinaQuimi: $( ResObjPai ).find( '#DatFinaQuimi' ).val(),
								ExcutQuimi: $( ResObjPai ).find( '#ExcutQuimi' ).val(),
								anexo_ensa_tabe: 'QUIMICO',
								AnexosQuimi: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Quimico/SetSalvQuimi/', function( vRespAjax ){
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
	static SetImpreQuimi( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Quimico/SetImpreQuimi/', function( vRespAjax ){
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
	static SetImpreCertQuimi( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Quimico/SetImprCertQuimi/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};