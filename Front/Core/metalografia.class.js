/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelas Metalografia
 * do sistema
 *
 * @package    Metalografia
 * @author     Alexandre Farinelli Zardo
*/
export default class Metalografia {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableMeta( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		switch ( vCampo ){ 
			case 'amos_meta_cada_iden':
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
			case 'amos_meta_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_meta_cada_result':
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
			case 'amos_meta_cada_reag':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_meta_cada_qtde':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_meta_cada_matriz':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_meta_cada_graos':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_meta_cada_parti':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_meta_cada_caract':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_meta_cada_obs':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_meta_cada_grafi':
				if ( vTabela.cell( vLinha, 20 ).data() == 0 ){
					return false;
				} else {
					return true;
				};
				break;
			case 'amos_meta_cada_fina_data':
				return vTabela.cell( vLinha, 21 ).data()
				break;
			case 'amos_meta_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 22 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 23 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 24 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 25 ).data();
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
	static GetTableMeta( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Metalografia/GetMeta/', function( vRespAjax ){
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
							{ data: 'amos_meta_cada_boto' },
							{ data: 'amos_meta_cada_iden' },
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
							{ data: 'amos_meta_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_meta_cada_result', render: function(d) {
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
							{ data: 'amos_meta_cada_reag', visible: false },
							{ data: 'amos_meta_cada_qtde', visible: false },
							{ data: 'amos_meta_cada_matriz', visible: false },
							{ data: 'amos_meta_cada_graos', visible: false },
							{ data: 'amos_meta_cada_parti', visible: false },
							{ data: 'amos_meta_cada_caract', visible: false },
							{ data: 'amos_meta_cada_obs', visible: false },
							{ data: 'amos_meta_cada_grafi', visible: false },
							{ data: 'amos_meta_cada_fina_data', visible: false },
							{ data: 'amos_meta_cada_fina_usua_iden', visible: false },
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
							if ( data[ 'amos_meta_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_meta_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_meta_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_meta_cada_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabMeta' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabMeta" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListMeta" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-microscope"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListMeta" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenMeta" value="Automatico" disabled>' +
								'<label for="IdenMeta">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisMeta" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisMeta">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGMeta" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGMeta">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSMeta" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSMeta">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieMeta" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieMeta">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrMeta" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrMeta">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateMeta" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateMeta">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaMeta" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaMeta">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrMeta" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrMeta">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
							'<input type="text" class="form-control" id="LocaMeta" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaMeta">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ReageMeta" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="ReageMeta">Reagente</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulMeta" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulMeta">Resultado</label>' +
								'<div class="invalid-feedback">' +
									'Resultado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeMeta" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeMeta">Quantidade</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="GrafiMeta">' +
								'<label class="form-check-label" for="GrafiMeta">Grafita ?</label>' +
					  		'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="MatrizMeta" style="height: 100px" data-obriga="S"></textarea>' +
								'<label class="form-label" for="MatrizMeta">Matriz</label>' +
								'<div class="invalid-feedback">' +
									'Matriz não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="GraosMeta" style="height: 100px"></textarea>' +
								'<label class="form-label" for="GraosMeta">Tamanho dos Grãos</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="PartiMeta" style="height: 100px"></textarea>' +
								'<label class="form-label" for="PartiMeta">Particularidades</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="CaracMeta" style="height: 100px"></textarea>' +
								'<label class="form-label" for="CaracMeta">Caracterização</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseMeta" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseMeta">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaMeta">' +
								'<label class="form-check-label" for="FinaMeta">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaMeta" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaMeta">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutMeta">Executado Por</label>' +
								'<select class="form-select" id="ExcutMeta" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexMeta" class="alert alert-primary text-center" role="alert">' +
          						'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnMeta" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
        					'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableMeta" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataMeta">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvMeta" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechMeta"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabMeta' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListMeta' ) );
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
	static GetEdtMeta( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormMeta' ], function( ResObjPai ){
			Metalografia.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO METALOGRAFICO', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Metalografia/GetUsuaMeta/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutMeta' ), Resposta.registros, function(){
						if ( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvMeta' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_iden' ) );
						$( ResObjPai ).find( '#EmisMeta' ).val( Core.Data( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#ReageMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_reag' ) );
						if ( $( ResObjPai ).find( '#ReageMeta' ).val() == '' ){
							$( ResObjPai ).find( '#ReageMeta' ).val( 'NITAL - 3%' )
						};
						$( ResObjPai ).find( '#ResulMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeMeta' ), 'INTEIRO' );
						$( ResObjPai ).find( '#GrafiMeta' ).prop( 'checked', Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_grafi' ) )
						$( ResObjPai ).find( '#MatrizMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_matriz' ) )
						$( ResObjPai ).find( '#GraosMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_graos' ) )
						$( ResObjPai ).find( '#PartiMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_parti' ) )
						$( ResObjPai ).find( '#CaracMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_caract' ) )
						$( ResObjPai ).find( '#ObseMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_obs' ) )
						$( ResObjPai ).find( '#FinaMeta' ).prop( 'checked', false );
						if ( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaMeta' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaMeta' ).val( '' );
						$( ResObjPai ).find( '#ExcutMeta' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaMeta' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaMeta' ).val( Core.Data( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutMeta' ).val( Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaMeta' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutMeta' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaMeta' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutMeta' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaMeta', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableMeta' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenMeta' ).val(),
								'anexo_ensa_tabe': 'METALOGRAFIA',
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
	static GetCloseMeta( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListMeta', 'EdtListMeta' ], function( ResObjPai ){
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
	static SetSalvMeta( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListMeta', 'EdtListMeta' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableMeta' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_iden' ),
								IdenMeta: $( ResObjPai ).find( '#IdenMeta' ).val(),
								ReageMeta: $( ResObjPai ).find( '#ReageMeta' ).val(),
								ResulMeta: $( ResObjPai ).find( '#ResulMeta' ).val(),
								QtdeMeta: $( ResObjPai ).find( '#QtdeMeta' ).val(),
								GrafiMeta: $( ResObjPai ).find( '#GrafiMeta' ).is( ':checked' ),
								MatrizMeta: $( ResObjPai ).find( '#MatrizMeta' ).val(),
								GraosMeta: $( ResObjPai ).find( '#GraosMeta' ).val(),
								PartiMeta: $( ResObjPai ).find( '#PartiMeta' ).val(),
								CaracMeta: $( ResObjPai ).find( '#CaracMeta' ).val(),
								ObseMeta: $( ResObjPai ).find( '#ObseMeta' ).val(),
								FinaMeta: $( ResObjPai ).find( '#FinaMeta' ).is( ':checked' ),
								DatFinaMeta: $( ResObjPai ).find( '#DatFinaMeta' ).val(),
								ExcutMeta: $( ResObjPai ).find( '#ExcutMeta' ).val(),
								anexo_ensa_tabe: 'METALOGRAFIA',
								AnexosMeta: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Metalografia/SetSalvMeta/', function( vRespAjax ){
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
	static SetImpreMeta( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Metalografia/SetImpreMeta/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};