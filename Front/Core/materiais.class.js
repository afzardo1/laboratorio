/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelos materiais
 * do sistema
 *
 * @package    Materiais
 * @author     Alexandre Farinelli Zardo
*/
export default class Materiais {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableMate( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'mate_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'mate_cada_descr':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'mate_cada_forne':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'mate_cada_limi_resi':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'mate_cada_limi_esco':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'mate_cada_along':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'mate_cada_redu_area':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'mate_cada_dure':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'mate_cada_impa':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'mate_cada_prof_cama_endu':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'mate_cada_C': 
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'mate_cada_Si':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'mate_cada_Mn':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'mate_cada_P':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'mate_cada_S':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'mate_cada_Cr':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'mate_cada_Ni':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'mate_cada_Mo':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'mate_cada_Cu':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'mate_cada_Al':
				return vTabela.cell( vLinha, 20 ).data();
				break;
			case 'mate_cada_Fe': 
				return vTabela.cell( vLinha, 21 ).data();
				break;
			case 'mate_cada_V':
				return vTabela.cell( vLinha, 22 ).data();
				break;
			case 'mate_cada_Co':
				return vTabela.cell( vLinha, 23 ).data();
				break;
			case 'mate_cada_Nb':
				return vTabela.cell( vLinha, 24 ).data();
				break;
			case 'mate_cada_Ti':
				return vTabela.cell( vLinha, 25 ).data();
				break;
			case 'mate_cada_W':
				return vTabela.cell( vLinha, 26 ).data();
				break;
			case 'mate_cada_Mg':
				return vTabela.cell( vLinha, 27 ).data();
				break;
			case 'mate_cada_Zn':
				return vTabela.cell( vLinha, 28 ).data();
				break;
			case 'mate_cada_Pb':
				return vTabela.cell( vLinha, 29 ).data();
				break;
			case 'mate_cada_Sb':
				return vTabela.cell( vLinha, 30 ).data();
				break;
			case 'mate_cada_Sn': 
				return vTabela.cell( vLinha, 31 ).data();
				break;
			case 'mate_cada_Ca':
				return vTabela.cell( vLinha, 32 ).data();
				break;
			case 'mate_cada_Cl':
				return vTabela.cell( vLinha, 33 ).data();
				break;
			case 'mate_cada_N':
				return vTabela.cell( vLinha, 34 ).data();
				break;
			case 'mate_cada_Na':
				return vTabela.cell( vLinha, 35 ).data();
				break;
			case 'mate_cada_Ceq':
				return vTabela.cell( vLinha, 36 ).data();
				break;
			case 'mate_cada_tenant_iden':
				return vTabela.cell( vLinha, 37 ).data();
				break;
			case 'mate_cada_empre_iden':
				return vTabela.cell( vLinha, 38 ).data();
				break;
			case 'mate_cada_dure_super':
				return vTabela.cell( vLinha, 39 ).data();
				break;
			case 'mate_cada_dure_nucle':
				return vTabela.cell( vLinha, 40 ).data();
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
	static GetTableMate( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Materiais/GetMate/', function( vRespAjax ){
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
							{ data: 'mate_cada_boto' },
							{ data: 'mate_cada_iden' },
							{ data: 'mate_cada_descr' },
							{ data: 'mate_cada_forne' },
							{ data: 'mate_cada_limi_resi', visible: false },
							{ data: 'mate_cada_limi_esco', visible: false },
							{ data: 'mate_cada_along', visible: false },
							{ data: 'mate_cada_redu_area', visible: false },
							{ data: 'mate_cada_dure', visible: false },
							{ data: 'mate_cada_impa', visible: false },
							{ data: 'mate_cada_prof_cama_endu', visible: false },
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
							{ data: 'mate_cada_tenant_iden', visible: false },
							{ data: 'mate_cada_empre_iden', visible: false },
							{ data: 'mate_cada_dure_super', visible: false },
							{ data: 'mate_cada_dure_nucle', visible: false },
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabMate' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabMate" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListMate" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-atom"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListMate" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenMate" value="Automatico" disabled>' +
								'<label for="IdenMate">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-11">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DescrMate" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="DescrMate">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Descrição do material não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrMate" value="" placeholder="" maxlength="150">' +
								'<label for="FabrMate">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DureMate" value="" placeholder="" maxlength="80">' +
								'<label for="DureMate">Dureza</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="SuperDureMate" value="" placeholder="" maxlength="80">' +
								'<label for="SuperDureMate">Dureza Superficie</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NucleDureMate" value="" placeholder="" maxlength="80">' +
								'<label for="NucleDureMate">Dureza Nucleo</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2"></div>' +	
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ImpactoMate" value="" placeholder="" maxlength="80">' +
								'<label for="ImpactoMate">Impacto</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ProfCamaEnduMate" value="" placeholder="" maxlength="80">' +
								'<label for="ProfCamaEnduMate">Prof. Camada Endurecida</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="LimiResiMinMate" value="" placeholder="" maxlength="80">' +
									'<label for="LimiResiMinMate">Lim. Resistência (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="LimiEscoMinMate" value="" placeholder="" maxlength="80">' +
									'<label for="LimiEscoMinMate">Lim. Escoamento (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="AlongMinMate" value="" placeholder="" maxlength="80">' +
									'<label for="AlongMinMate">Alongamento (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ReduAreaMinMate" value="" placeholder="" maxlength="80">' +
									'<label for="ReduAreaMinMate">Redu. Área (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="LimiResiMaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="LimiResiMaxMate">Lim. Resistência (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="LimiEscoMaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="LimiEscoMaxMate">Lim. Escoamento (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="AlongMaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="AlongMaxMate">Alongamento (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="ReduAreaMaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="ReduAreaMaxMate">Redu. Área (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="C_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="C_MinMate">C (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Si_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Si_MinMate">Si (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mn_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mn_MinMate">Mn (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="P_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="P_MinMate">P (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="C_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="C_MaxMate">C (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Si_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Si_MaxMate">Si (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mn_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mn_MaxMate">Mn (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="P_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="P_MaxMate">P (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="S_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="S_MinMate">S (min.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cr_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cr_MinMate">Cr (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ni_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ni_MinMate">Ni (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mo_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mo_MinMate">Mo (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="S_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="S_MaxMate">S (max.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cr_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cr_MaxMate">Cr (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ni_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ni_MaxMate">Ni (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mo_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mo_MaxMate">Mo (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cu_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cu_MinMate">Cu (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Al_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Al_MinMate">Al (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Fe_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Fe_MinMate">Fe (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="V_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="V_MinMate">V (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cu_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cu_MaxMate">Cu (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Al_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Al_MaxMate">Al (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Fe_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Fe_MaxMate">Fe (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="V_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="V_MaxMate">V (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Co_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Co_MinMate">Co (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Nb_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Nb_MinMate">Nb (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ti_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ti_MinMate">Ti (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="W_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="W_MinMate">W (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Co_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Co_MaxMate">Co (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Nb_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Nb_MaxMate">Nb (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ti_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ti_MaxMate">Ti (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="W_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="W_MaxMate">W (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mg_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mg_MinMate">Mg (min.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Zn_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Zn_MinMate">Zn (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Pb_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Pb_MinMate">Pb (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Sb_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Sb_MinMate">Sb (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Mg_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Mg_MaxMate">Mg (max.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Zn_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Zn_MaxMate">Zn (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Pb_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Pb_MaxMate">Pb (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Sb_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Sb_MaxMate">Sb (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Sn_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Sn_MinMate">Sn (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ca_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ca_MinMate">Ca (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cl_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cl_MinMate">Cl (min.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="N_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="N_MinMate">N (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Sn_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Sn_MaxMate">Sn (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ca_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ca_MaxMate">Ca (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Cl_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Cl_MaxMate">Cl (max.)</label>' +
								'</div>' +
							'</div>' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="N_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="N_MaxMate">N (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="border border-3">' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Na_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Na_MinMate">Na (min.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ceq_MinMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ceq_MinMate">Ceq (min.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="row p-3" >' +
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Na_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Na_MaxMate">Na (max.)</label>' +
								'</div>' +
							'</div>' +	
							'<div class="col-xl-3">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="Ceq_MaxMate" value="" placeholder="" maxlength="80">' +
									'<label for="Ceq_MaxMate">Ceq (max.)</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanMate">Tenant</label>' +
								'<select class="form-select" id="TenanMate" aria-label="Floating label select example" required uppercase>' +
							  	'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmpreMate">Empresa</label>' +
								'<select class="form-select" id="EmpreMate" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvMate" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechMate"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabMate' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListMate' ) );
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
	static GetAddMate( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormMate' ], function( ResObjPai ){
			Materiais.GetForm( ResObjPai, 'Add', 'INCLUSÃO MATERIAIS', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Laboratorio/Materiais/GetTenanMate/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanMate' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanMate' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanMate' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanMate' ).val(),
						  } }, '../../Laboratorio/Materiais/GetEmpreMate/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreMate' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmpreMate' ).prop( 'disabled', true );
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
	static GetEdtMate( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormMate' ], function( ResObjPai ){
			Materiais.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO MATERIAIS', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Materiais/GetTenanMate/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanMate' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#TenanMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_tenant_iden' ) ).trigger( 'change' );
						if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
							$( ResObjPai ).find( '#TenanMate' ).prop( 'disabled', true );
						};
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanMate' ).val(),
						  } }, '../../Laboratorio/Materiais/GetEmpreMate/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmpreMate' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_iden' ) );
								$( ResObjPai ).find( '#DescrMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_descr' ) );
								$( ResObjPai ).find( '#FabrMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_forne' ) );
								$( ResObjPai ).find( '#LimiResiMinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_limi_resi' ).split( '-' )[0] );
								$( ResObjPai ).find( '#LimiEscoMinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_limi_esco' ).split( '-' )[0] );
								$( ResObjPai ).find( '#AlongMinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_along' ).split( '-' )[0] );
								$( ResObjPai ).find( '#ReduAreaMinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_redu_area' ).split( '-' )[0] );
								$( ResObjPai ).find( '#LimiResiMaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_limi_resi' ).split( '-' )[1] );
								$( ResObjPai ).find( '#LimiEscoMaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_limi_esco' ).split( '-' )[1] );
								$( ResObjPai ).find( '#AlongMaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_along' ).split( '-' )[1] );
								$( ResObjPai ).find( '#ReduAreaMaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_redu_area' ).split( '-' )[1] );
								$( ResObjPai ).find( '#DureMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_dure' ) );
								$( ResObjPai ).find( '#SuperDureMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_dure_super' ) );
								$( ResObjPai ).find( '#NucleDureMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_dure_nucle' ) );
								$( ResObjPai ).find( '#ImpactoMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_impa' ) );
								$( ResObjPai ).find( '#ProfCamaEnduMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_prof_cama_endu' ) );
								$( ResObjPai ).find( '#C_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_C' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Si_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Si' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Mn_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mn' ).split( '-' )[0] );
								$( ResObjPai ).find( '#P_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_P' ).split( '-' )[0] );
								$( ResObjPai ).find( '#C_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_C' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Si_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Si' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Mn_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mn' ).split( '-' )[1] );
								$( ResObjPai ).find( '#P_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_P' ).split( '-' )[1] );
								$( ResObjPai ).find( '#S_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_S' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Cr_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cr' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Ni_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ni' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Mo_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mo' ).split( '-' )[0] );
								$( ResObjPai ).find( '#S_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_S' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Cr_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cr' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Ni_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ni' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Mo_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mo' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Cu_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cu' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Al_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Al' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Fe_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Fe' ).split( '-' )[0] );
								$( ResObjPai ).find( '#V_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_V' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Cu_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cu' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Al_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Al' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Fe_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Fe' ).split( '-' )[1] );
								$( ResObjPai ).find( '#V_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_V' ).split( '-' )[1] );	
								$( ResObjPai ).find( '#Co_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Co' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Nb_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Nb' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Ti_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ti' ).split( '-' )[0] );
								$( ResObjPai ).find( '#W_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_W' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Co_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Co' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Nb_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Nb' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Ti_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ti' ).split( '-' )[1] );
								$( ResObjPai ).find( '#W_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_W' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Mg_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mg' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Zn_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Zn' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Pb_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Pb' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Sb_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Sb' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Mg_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Mg' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Zn_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Zn' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Pb_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Pb' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Sb_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Sb' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Sn_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Sn' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Ca_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ca' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Cl_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cl' ).split( '-' )[0] );
								$( ResObjPai ).find( '#N_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_N' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Sn_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Sn' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Ca_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ca' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Cl_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Cl' ).split( '-' )[1] );
								$( ResObjPai ).find( '#N_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_N' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Na_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Na' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Ceq_MinMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ceq' ).split( '-' )[0] );
								$( ResObjPai ).find( '#Na_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Na' ).split( '-' )[1] );
								$( ResObjPai ).find( '#Ceq_MaxMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_Ceq' ).split( '-' )[1] );								
								$( ResObjPai ).find( '#EmpreMate' ).val( Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_empre_iden' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#EmpreMate' ).prop( 'disabled', true );
								};
								Core.ValiDocu( $( ResObjPai ).find( '#DocMate' ) );
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
	static GetCloseMate( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListMate', 'EdtListMate' ], function( ResObjPai ){
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
	static SetSalvMate( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListMate', 'EdtListMate' ], function( ResObjPai ){
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
							IdenMate: $( ResObjPai ).find( '#IdenMate' ).val(),
							DescrMate: $( ResObjPai ).find( '#DescrMate' ).val(),
							FabrMate: $( ResObjPai ).find( '#FabrMate' ).val(),
							LimiResiMate: $( ResObjPai ).find( '#LimiResiMinMate' ).val() + '-' + $( ResObjPai ).find( '#LimiResiMaxMate' ).val(),
							LimiEscoMate: $( ResObjPai ).find( '#LimiEscoMinMate' ).val() + '-' + $( ResObjPai ).find( '#LimiEscoMaxMate' ).val(),
							AlongMate: $( ResObjPai ).find( '#AlongMinMate' ).val() + '-' + $( ResObjPai ).find( '#AlongMaxMate' ).val(),
							ReduAreaMate: $( ResObjPai ).find( '#ReduAreaMinMate' ).val() + '-' + $( ResObjPai ).find( '#ReduAreaMaxMate' ).val(),
							DureMate: $( ResObjPai ).find( '#DureMate' ).val(),
							SuperDureMate: $( ResObjPai ).find( '#SuperDureMate' ).val(),
							NucleDureMate: $( ResObjPai ).find( '#NucleDureMate' ).val(),
							ImpactoMate: $( ResObjPai ).find( '#ImpactoMate' ).val(),
							ProfCamaEnduMate: $( ResObjPai ).find( '#ProfCamaEnduMate' ).val(),
							C_Mate: $( ResObjPai ).find( '#C_MinMate' ).val() + '-' + $( ResObjPai ).find( '#C_MaxMate' ).val(),
							Si_Mate: $( ResObjPai ).find( '#Si_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Si_MaxMate' ).val(),
							Mn_Mate: $( ResObjPai ).find( '#Mn_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Mn_MaxMate' ).val(),
							P_Mate: $( ResObjPai ).find( '#P_MinMate' ).val() + '-' + $( ResObjPai ).find( '#P_MaxMate' ).val(),
							S_Mate: $( ResObjPai ).find( '#S_MinMate' ).val() + '-' + $( ResObjPai ).find( '#S_MaxMate' ).val(),
							Cr_Mate: $( ResObjPai ).find( '#Cr_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Cr_MaxMate' ).val(),
							Ni_Mate: $( ResObjPai ).find( '#Ni_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Ni_MaxMate' ).val(),
							Mo_Mate: $( ResObjPai ).find( '#Mo_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Mo_MaxMate' ).val(),
							Cu_Mate: $( ResObjPai ).find( '#Cu_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Cu_MaxMate' ).val(),
							Al_Mate: $( ResObjPai ).find( '#Al_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Al_MaxMate' ).val(),
							Fe_Mate: $( ResObjPai ).find( '#Fe_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Fe_MaxMate' ).val(),
							V_Mate: $( ResObjPai ).find( '#V_MinMate' ).val() + '-' + $( ResObjPai ).find( '#V_MaxMate' ).val(),
							Co_Mate: $( ResObjPai ).find( '#Co_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Co_MaxMate' ).val(),
							Nb_Mate: $( ResObjPai ).find( '#Nb_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Nb_MaxMate' ).val(),
							Ti_Mate: $( ResObjPai ).find( '#Ti_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Ti_MaxMate' ).val(),
							W_Mate: $( ResObjPai ).find( '#W_MinMate' ).val() + '-' + $( ResObjPai ).find( '#W_MaxMate' ).val(),
							Mg_Mate: $( ResObjPai ).find( '#Mg_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Mg_MaxMate' ).val(),
							Zn_Mate: $( ResObjPai ).find( '#Zn_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Zn_MaxMate' ).val(),
							Pb_Mate: $( ResObjPai ).find( '#Pb_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Pb_MaxMate' ).val(),
							Sb_Mate: $( ResObjPai ).find( '#Sb_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Sb_MaxMate' ).val(),
							Sn_Mate: $( ResObjPai ).find( '#Sn_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Sn_MaxMate' ).val(),
							Ca_Mate: $( ResObjPai ).find( '#Ca_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Ca_MaxMate' ).val(),
							Cl_Mate: $( ResObjPai ).find( '#Cl_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Cl_MaxMate' ).val(),
							N_Mate: $( ResObjPai ).find( '#N_MinMate' ).val() + '-' + $( ResObjPai ).find( '#N_MaxMate' ).val(),
							Na_Mate: $( ResObjPai ).find( '#Na_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Na_MaxMate' ).val(),
							Ceq_Mate: $( ResObjPai ).find( '#Ceq_MinMate' ).val() + '-' + $( ResObjPai ).find( '#Ceq_MaxMate' ).val(),
							TenanMate: $( ResObjPai ).find( '#TenanMate' ).val(),
							EmpreMate: $( ResObjPai ).find( '#EmpreMate' ).val(),
						}},
						'../../Laboratorio/Materiais/SetSalvMate/', function( vRespAjax ){
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
	static SetDeleMate( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenMate: Core.Materiais.GetDataTableMate( '#TableMate', vLinha, 'mate_cada_iden' ),
			}},
			'../../Laboratorio/Materiais/SetDeleMate/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};