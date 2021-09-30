/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelos achatamentos / expansão
 * do sistema
 *
 * @package    Achatamento
 * @author     Alexandre Farinelli Zardo
*/
export default class Achatamento {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableAchat( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		
		switch ( vCampo ){ 
			case 'amos_achat_cada_iden':
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
			case 'amos_achat_cada_fina':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'amos_achat_cada_achat_result':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'amos_achat_cada_expan_result':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'clie_cada_nome':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'fabr_cada_nome':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'mate_cada_descr':
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'area_cada_descr':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'amos_cada_local':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'amos_achat_cada_qtde':
				return vTabela.cell( vLinha, 14 ).data();
				break;
			case 'amos_achat_cada_obs':
				return vTabela.cell( vLinha, 15 ).data();
				break;
			case 'amos_achat_cada_fina_data':
				return vTabela.cell( vLinha, 16 ).data();
				break;
			case 'amos_achat_cada_fina_usua_iden':
				return vTabela.cell( vLinha, 17 ).data();
				break;
			case 'amos_cada_iden':
				return vTabela.cell( vLinha, 18 ).data();
				break;
			case 'amos_cada_tenan':
				return vTabela.cell( vLinha, 19 ).data();
				break;
			case 'amos_cada_empre':
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
	static GetTableAchat( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Laboratorio/Achatamento/GetAchat/', function( vRespAjax ){
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
							{ data: 'amos_achat_cada_boto' },
							{ data: 'amos_achat_cada_iden' },
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
							{ data: 'amos_achat_cada_fina', render: function(d) {
								if ( d == 0 ) {
									return 'NÃO';
								} else if ( d == 1 ) {
									return 'SIM';
								};
							} },
							{ data: 'amos_achat_cada_achat_result', render: function(d) {
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
							{ data: 'amos_achat_cada_expan_result', render: function(d) {
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
							{ data: 'amos_achat_cada_qtde', visible: false },
							{ data: 'amos_achat_cada_obs', visible: false },
							{ data: 'amos_achat_cada_fina_data', visible: false },
							{ data: 'amos_achat_cada_fina_usua_iden', visible: false },
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
							if ( data[ 'amos_achat_cada_achat_result' ] == 0 && data[ 'amos_achat_cada_expan_result' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							} else if ( data[ 'amos_achat_cada_achat_result' ] == 1 && data[ 'amos_achat_cada_expan_result' ] == 1 ) {
								$( row ).addClass( 'bg-warning' );
							} else if ( data[ 'amos_achat_cada_achat_result' ] == 2 && data[ 'amos_achat_cada_expan_result' ] == 2 ) {
								$( row ).addClass( 'bg-info' );
							} else if ( data[ 'amos_achat_cada_achat_result' ] == 3 && data[ 'amos_achat_cada_expan_result' ] == 3 ) {
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabAchat' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabAchat" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListAchat" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="nav-icon fas fa-compress-arrows-alt"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListAchat" role="tabpanel" aria-labelledby="' + vAba + '-tab-clientes">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenAchat" value="Automatico" disabled>' +
								'<label for="IdenAchat">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2"></div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EmisAchat" value="" placeholder="" maxlength="10" disabled>' +
								'<label for="EmisAchat">Emissão</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="RGAchat" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="RGAchat">Registro. Geral</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="OSAchat" value="" placeholder="" maxlength="30" disabled>' +
								'<label for="OSAchat">Ordem de Serviço</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +	
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="ClieAchat" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="ClieAchat">Cliente</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="FabrAchat" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="FabrAchat">Fabricante</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="MateAchat" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="MateAchat">Material</label>' +
							'</div>' +	
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="AreaAchat" value="" placeholder="" maxlength="150" disabled>' +
								'<label for="AreaAchat">Área</label>' +
							'</div>' +	
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="DescrAchat" style="height: 100px" disabled></textarea>' +
								'<label class="form-label" for="DescrAchat">Descrição</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
							'<input type="text" class="form-control" id="LocaAchat" value="" placeholder="" maxlength="20" disabled>' +
								'<label class="form-label" for="LocaAchat">Local Execução</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulAchat" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulAchat">Resultado Achatamento</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Achatamento não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="ResulExpanAchat" aria-label="Floating label select example" data-obriga="S">' +
									'<option value="-1" selected>SELECIONE</option>' +
									'<option value="0">REPROVADO</option>' +
									'<option value="1">INFORMATIVO</option>' +
									'<option value="2">TOLERÁVEL</option>' +
									'<option value="3">APROVADO</option>' +
								'</select>' +
								'<label class="form-label" for="ResulExpanAchat">Resultado Expansão</label>' +
								'<div class="invalid-feedback">' +
									'Resultado Expansão não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control text-end" id="QtdeAchat" value="" placeholder="" maxlength="20">' +
								'<label class="form-label" for="QtdeAchat">Quantidade</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
  								'<textarea class="form-control" placeholder="" id="ObseAchat" style="height: 100px"></textarea>' +
								'<label class="form-label" for="ObseAchat">Observação</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2 d-flex justify-content-center d-flex align-items-center">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="checkbox" value="" id="FinaAchat">' +
								'<label class="form-check-label" for="FinaAchat">Finalizado ?</label>' +
					  		'</div>' +
						'</div>' +
						'<div class="col-xl-3">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DatFinaAchat" value="" placeholder="" maxlength="10" data-obriga="N" disabled>' +
								'<label for="DatFinaAchat">Data Finalizado</label>' +
								'<div class="invalid-feedback">' +
									'Data Finalizado não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-7">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="ExcutAchat">Executado Por</label>' +
								'<select class="form-select" id="ExcutAchat" aria-label="Floating label select example" data-obriga="N" disabled>' +
								'</select>' +
								'<div class="invalid-feedback">' +
									'Executado Por não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div id="TituAnexAchat" class="alert alert-primary text-center" role="alert">' +
								'ARQUIVOS ANEXADOS ' +
								'<button id="AddAnexBtnAchat" type="button" class="ms-5 btn btn-primary" title="INCLUIR ANEXO"><i class="fas fa-plus"></i></button>' +
							'</div>' +
							'<div class="table-responsive-sm">' +
								'<table id="AnexTableAchat" class="display responsive no-wrap">' +
									'<thead>' +
										'<tr>' +
											'<th scope="col"></th>' +
											'<th scope="col">Id</th>' +
											'<th scope="col">Tipo</th>' +
											'<th scope="col">Descrição</th>' +
											'<th scope="col">Arquivo</th>' +
										'</tr>' +
									'</thead>' +
									'<tbody id="AnexTableDataAchat">' +
									'</tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvAchat" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechAchat"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabAchat' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListAchat' ) );
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
	static GetEdtAchat( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormAchat' ], function( ResObjPai ){
			Achatamento.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO ACHATAMENTO/EXPANSÃO', function( ResObjPai ){
				Core.SetAjax( { evento: 
				  { usua_cada_status: '1',
				  	usua_cada_tenant: Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_tenan' ),
					usua_cada_empre: Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_empre' ),
				  } }, '../../Laboratorio/Achatamento/GetUsuaAchat/', function( Resposta ){
				  	Core.SetSele2( $( '#ExcutAchat' ), Resposta.registros, function(){
						if ( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_meta_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#SalvAchat' ).css( { 'display':'none' } );
						};
						$( ResObjPai ).find( '#IdenAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_iden' ) );
						$( ResObjPai ).find( '#EmisAchat' ).val( Core.Data( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_emis' ) ).format('L') );
						$( ResObjPai ).find( '#RGAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_regi' ) );
						$( ResObjPai ).find( '#OSAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_orse' ) );
						$( ResObjPai ).find( '#ClieAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'clie_cada_nome' ) );
						$( ResObjPai ).find( '#FabrAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'fabr_cada_nome' ) );
						$( ResObjPai ).find( '#MateAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'mate_cada_descr' ) );
						$( ResObjPai ).find( '#AreaAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'area_cada_descr' ) );
						$( ResObjPai ).find( '#DescrAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_descr' ) );
						$( ResObjPai ).find( '#LocaAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_local' ) );
						$( ResObjPai ).find( '#ResulAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_achat_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#ResulExpanAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_expan_result' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#QtdeAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_qtde' ) );
						Core.SetMask( $( ResObjPai ).find( '#QtdeAchat' ), 'INTEIRO' );
						$( ResObjPai ).find( '#ObseAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_obs' ) )
						$( ResObjPai ).find( '#FinaAchat' ).prop( 'checked', false );
						if ( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_fina' ) == 1 ){
							$( ResObjPai ).find( '#FinaAchat' ).prop( 'checked', true );
						};
						$( ResObjPai ).find( '#DatFinaAchat' ).val( '' );
						$( ResObjPai ).find( '#ExcutAchat' ).val( '0' );
						if ( $( ResObjPai ).find( '#FinaAchat' ).is(':checked') ) {
							$( ResObjPai ).find( '#DatFinaAchat' ).val( Core.Data( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_fina_data' )).format('L') );
							$( ResObjPai ).find( '#ExcutAchat' ).val( Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_fina_usua_iden' ) ).trigger( 'change' );
							$( ResObjPai ).find( '#DatFinaAchat' ).prop('disabled', false);
							$( ResObjPai ).find( '#ExcutAchat' ).prop('disabled', false);
							$( ResObjPai ).find( '#DatFinaAchat' ).attr( 'data-obriga', 'S' );
							$( ResObjPai ).find( '#ExcutAchat' ).attr( 'data-obriga', 'S' );
						};
						Core.SetMask( '#DatFinaAchat', 'DATA' );
						Core.Anexos.GetTableAnex( 
							$( ResObjPai ).find( '#AnexTableAchat' ), { 
							evento:{
								'anexo_ensa_iden': $( ResObjPai ).find( '#IdenAchat' ).val(),
								'anexo_ensa_tabe': 'ACHATAMENTO',
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
	static GetCloseAchat( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListAchat', 'EdtListAchat' ], function( ResObjPai ){
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
	static SetSalvAchat( VThis, vLinha, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListAchat', 'EdtListAchat' ], function( ResObjPai ){
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
					Core.Anexos.SetSalvAnex(  $( ResObjPai ).find( '#AnexTableAchat' ), function( RespAnexos ){ 
						Core.SetAjax({
							evento:{
								IdenAmos: Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_iden' ),
								IdenAchat: $( ResObjPai ).find( '#IdenAchat' ).val(),
								ResulAchat: $( ResObjPai ).find( '#ResulAchat' ).val(),
								ResulExpanAchat: $( ResObjPai ).find( '#ResulExpanAchat' ).val(),
								QtdeAchat: $( ResObjPai ).find( '#QtdeAchat' ).val(),
								ObseAchat: $( ResObjPai ).find( '#ObseAchat' ).val(),
								FinaAchat: $( ResObjPai ).find( '#FinaAchat' ).is( ':checked' ),
								DatFinaAchat: $( ResObjPai ).find( '#DatFinaAchat' ).val(),
								ExcutAchat: $( ResObjPai ).find( '#ExcutAchat' ).val(),
								anexo_ensa_tabe: 'ACHATAMENTO',
								AnexosAchat: JSON.stringify( RespAnexos ),
							}},
							'../../Laboratorio/Achatamento/SetSalvAchat/', function( vRespAjax ){
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
	static SetImpreAchat( vFiltros, vResp ) {
		Core.SetAjax( vFiltros,
			'../../Laboratorio/Achatamento/SetImpreAchat/', function( vRespAjax ){
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};
};