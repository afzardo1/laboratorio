/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel dureza
 * do sistema
 *
 * @package    Dureza
 * @author     Alexandre Farinelli Zardo
*/
export default class Dureza {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableDure( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_dure_cada_iden':
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
			case 'amos_dure_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_dure_cada_result':
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
			case 'amos_dure_cada_qtde':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_dure_cada_dure_espe':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_dure_cada_dure_obti':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_dure_cada_vickers':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_dure_cada_obs':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_dure_cada_espe_super':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_dure_cada_obti_super':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_dure_cada_espe_nucle':
				return vTabela.cell( vLinha, 20 ).data();
				break;
			case 'amos_dure_cada_obti_nucle':
				return vTabela.cell( vLinha, 21 ).data();
				break;
			case 'amos_dure_cada_fina_data':
				return vTabela.cell( vLinha, 22 ).data();
				break;
			case 'amos_dure_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 23 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 24 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 25 ).data();
				break;
			case 'amos_cada_empre':
				return vTabela.cell( vLinha, 26 ).data();
				break;
			case 'mate_cada_dure':
				return vTabela.cell( vLinha, 27 ).data();
				break;
			case 'mate_cada_dure_super':
				return vTabela.cell( vLinha, 28 ).data();
				break;
			case 'mate_cada_dure_nucle':
				return vTabela.cell( vLinha, 29 ).data();
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
	static GetTableDure( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Dureza/GetDure/', function( vRespAjax ){
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
							{ data: 'amos_dure_cada_boto' },
							{ data: 'amos_dure_cada_iden' },
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
							{ data: 'amos_dure_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_dure_cada_result', render: function(d) {
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
							{ data: 'amos_dure_cada_qtde', visible: false },
							{ data: 'amos_dure_cada_dure_espe', visible: false },
							{ data: 'amos_dure_cada_dure_obti', visible: false },
							{ data: 'amos_dure_cada_vickers', visible: false },
							{ data: 'amos_dure_cada_obs', visible: false },
							{ data: 'amos_dure_cada_espe_super', visible: false },
							{ data: 'amos_dure_cada_obti_super', visible: false },
							{ data: 'amos_dure_cada_espe_nucle', visible: false },
							{ data: 'amos_dure_cada_obti_nucle', visible: false },							
							{ data: 'amos_dure_cada_fina_data', visible: false },
							{ data: 'amos_dure_cada_fina_usua_iden', visible: false },
							{ data: 'amos_cada_iden', visible: false },
							{ data: 'amos_cada_tenan', visible: false },
							{ data: 'amos_cada_empre', visible: false },
							{ data: 'mate_cada_dure', visible: false },
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
							if ( data[ 'amos_dure_cada_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_dure_cada_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_dure_cada_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_dure_cada_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabDure' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabDure" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListDure" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fab fa-creative-commons-remix"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListDure" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenDure" value="Automatico" disabled>' +
								'<label for="IdenDure">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisDure" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisDure">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGDure" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGDure">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSDure" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSDure">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieDure" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieDure">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrDure" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrDure">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateDure" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateDure">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaDure" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaDure">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrDure" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrDure">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="LocaDure" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaDure">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulDure" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulDure">Resultado Dureza</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Dureza não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeDure">Quantidade</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="VickersDure" aria-label="Floating label select example">' +
									'<option value="0" selected>NENHUM</option>' +
									'<option value="1">ENSAIO DUREZA VICKERS</option>' +
									'<option value="2">ENSAIO MICRODUREZA VICKERS</option>' +
								'</select>' +
								'<label class="form-label" for="VickersDure">Ensaio Vickers</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EspeDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="EspeDure">Especificado</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ObitDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="ObitDure">Obtido</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EspeSuperDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="EspeSuperDure">Especificado D. Superficie</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ObitSuperDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="ObitSuperDure">Obtido D. Superficie</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EspeNucleDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="EspeNucleDure">Especificado D. Nucleo</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ObitNucleDure" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="ObitNucleDure">Obtido D. Nucleo</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseDure" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseDure">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaDure">' +
								'<label class="form-check-label" for="FinaDure">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaDure" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaDure">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutDure">Executado Por</label>' +
								'<select class="form-select" id="ExcutDure" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexDure" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnDure" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableDure" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataDure">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvDure" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechDure"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabDure' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListDure' ) );
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
	static GetEdtDure( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormDure' ], function( ResObjPai ){
			Dureza.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO DUREZA', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Dureza/GetUsuaDure/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutDure' ), Resposta.registros, function(){
						if ( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvDure' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_iden' ) );
						$( ResObjPai ).find( '#EmisDure' ).val( Core.Data( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#TipoTracaDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_tipo' ) );
						$( ResObjPai ).find( '#ResulDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeDure' ), 'INTEIRO' );
						$( ResObjPai ).find( '#VickersDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_vickers' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#EspeDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_dure_espe' ) );
						if ( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_iden' ) == 'Automatico' ){
							$( ResObjPai ).find( '#EspeDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'mate_cada_dure' ) );
							$( ResObjPai ).find( '#EspeSuperDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'mate_cada_dure_super' ) );
							$( ResObjPai ).find( '#EspeNucleDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'mate_cada_dure_nucle' ) );
						};
						$( ResObjPai ).find( '#ObitDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_dure_obti' ) );
						$( ResObjPai ).find( '#ObitSuperDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_obti_super' ) );
						$( ResObjPai ).find( '#ObitNucleDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_obti_nucle' ) );
						$( ResObjPai ).find( '#ObseDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_obs' ) );
						$( ResObjPai ).find( '#FinaDure' ).prop( 'checked', false );
						if ( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaDure' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaDure' ).val( '' );
						$( ResObjPai ).find( '#ExcutDure' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaDure' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaDure' ).val( Core.Data( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutDure' ).val( Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_dure_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaDure' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutDure' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaDure' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutDure' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaDure', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableDure' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenDure' ).val(),
								'anexo_ensa_tabe': 'DUREZA',
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
	static GetCloseDure( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListDure', 'EdtListDure' ], function( ResObjPai ){
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
	static SetSalvDure( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListDure', 'EdtListDure' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableDure' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_iden' ),
								IdenDure: $( ResObjPai ).find( '#IdenDure' ).val(),
								ResulDure: $( ResObjPai ).find( '#ResulDure' ).val(),
								QtdeDure: $( ResObjPai ).find( '#QtdeDure' ).val(),
								VickersDure: $( ResObjPai ).find( '#VickersDure' ).val(),
								EspeDure: $( ResObjPai ).find( '#EspeDure' ).val(),
								ObitDure: $( ResObjPai ).find( '#ObitDure' ).val(),
								EspeSuperDure: $( ResObjPai ).find( '#EspeSuperDure' ).val(),
								ObitSuperDure: $( ResObjPai ).find( '#ObitSuperDure' ).val(),
								EspeNucleDure: $( ResObjPai ).find( '#EspeNucleDure' ).val(),
								ObitNucleDure: $( ResObjPai ).find( '#ObitNucleDure' ).val(),
								ObseDure: $( ResObjPai ).find( '#ObseDure' ).val(),
								FinaDure: $( ResObjPai ).find( '#FinaDure' ).is( ':checked' ),
								DatFinaDure: $( ResObjPai ).find( '#DatFinaDure' ).val(),
								ExcutDure: $( ResObjPai ).find( '#ExcutDure' ).val(),
								anexo_ensa_tabe: 'DUREZA',
								AnexosDure: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Dureza/SetSalvDure/', function( vRespAjax ){
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
	static SetImpreDure( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Dureza/SetImpreDure/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};