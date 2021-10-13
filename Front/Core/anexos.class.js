/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelos anexos
 * do sistema
 *
 * @package    Anexos
 * @author     Alexandre Farinelli Zardo
*/
export default class Anexos {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableAnex( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();
		switch ( vCampo ){ 
			case 'anexo_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'anexo_tipo':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'anexo_descr':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'anexo_arqui':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'anexo_arqui_ante':
				return vTabela.cell( vLinha, 5 ).data();
				break;
		};
	};
	
	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * 
	 * @param  vResp - Calback
	 * @return Calback
	 * @access public
	*/
	static GetTableAnex( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Anexos/GetAnex/', function( vRespAjax ){
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
						order: [ [ 2, 'desc' ] ],
						columns: [
							{ data: 'anexo_botao', orderable: false },
							{ data: 'anexo_cada_iden', orderable: false },
							{ data: 'anexo_tipo', orderable: false },
							{ data: 'anexo_descr', orderable: false },
							{ data: 'anexo_arqui', orderable: false },
							{ data: 'anexo_arqui_ante', visible: false },
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
	 * Atualiza Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * 
	 * @return Tabela
	 * @access public
	*/
	static AtuaTableAnex( vTabela ) {
		return $( vTabela ).DataTable();
	};

	/**
	 * Método para incluir
	 * no sistema
	 * 
	 * @param  vTabela - Id Tabela que sere implementada
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetAddAnex( vTabela, vResp ) {
		var TabeData = Anexos.AtuaTableAnex( vTabela );
		var NomeIten = {};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableAchat' ){
			NomeIten = {
				0: 'DeleAnexBtnAchat',
				1: 'DownAnexBtnAchat',
				2: 'TipoAnexAchat',
				3: 'DescrAnexAchat',
				4: 'FileAnexAchat',
				5: 'FileAnexLabeAchat',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDobra' ){
			NomeIten = {
				0: 'DeleAnexBtnDobra',
				1: 'DownAnexBtnDobra',
				2: 'TipoAnexDobra',
				3: 'DescrAnexDobra',
				4: 'FileAnexDobra',
				5: 'FileAnexLabeDobra',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDure' ){
			NomeIten = {
				0: 'DeleAnexBtnDure',
				1: 'DownAnexBtnDure',
				2: 'TipoAnexDure',
				3: 'DescrAnexDure',
				4: 'FileAnexDure',
				5: 'FileAnexLabeDure',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableCharp' ){
			NomeIten = {
				0: 'DeleAnexBtnCharp',
				1: 'DownAnexBtnCharp',
				2: 'TipoAnexCharp',
				3: 'DescrAnexCharp',
				4: 'FileAnexCharp',
				5: 'FileAnexLabeCharp',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMacro' ){
			NomeIten = {
				0: 'DeleAnexBtnMacro',
				1: 'DownAnexBtnMacro',
				2: 'TipoAnexMacro',
				3: 'DescrAnexMacro',
				4: 'FileAnexMacro',
				5: 'FileAnexLabeMacro',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMeta' ){
			NomeIten = {
				0: 'DeleAnexBtnMeta',
				1: 'DownAnexBtnMeta',
				2: 'TipoAnexMeta',
				3: 'DescrAnexMeta',
				4: 'FileAnexMeta',
				5: 'FileAnexLabeMeta',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTablePcend' ){
			NomeIten = {
				0: 'DeleAnexBtnPcend',
				1: 'DownAnexBtnPcend',
				2: 'TipoAnexPcend',
				3: 'DescrAnexPcend',
				4: 'FileAnexPcend',
				5: 'FileAnexLabePcend',
			};
		};
		var DataIten = {
			'anexo_botao': 
				'<button id="' + NomeIten[0] + '" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>' +
				'<button id="' + NomeIten[1] + '" type="button" class="btn btn-secondary" title="DONLOAD"><i class="fas fa-cloud-download-alt"></i></button>',
			'anexo_cada_iden': 'Automatico',
			'anexo_tipo':
				'<select id="' + NomeIten[2] + '" class="form-select" aria-label="Default select example">' +
					'<option value="0">ANEXOS</option>' +
					'<option value="1">FOTOS</option>' +
				'</select>',
			'anexo_descr': '<input id="' + NomeIten[3] + '" type="text" class="form-control" value"">',
			'anexo_arqui': 
				'<div class="custom-file">' +
				'   <input id="' + NomeIten[4] + '" type="file" data-arqu="" data-value="" class="custom-file-input">' +  
				'   <label id="' + NomeIten[5] + '" class="custom-file-label" for="FileAnexPedi" data-browse="Selecionar">Selecione um Arquivo</label>' +
				'</div>',
			'anexo_arqui_ante': '',
		};
		TabeData.row.add( DataIten ).draw();
		vResp( TabeData.row( TabeData.rows().count() - 1 ).node() );
	};

	/**
	 * Método para salvar
	 * no sistema
	 * 
	 * @param  vTabela - Id Tabela que sere implementada
	 * @param  vResp - calback
	 * 
	 * @return calback
	 * @access public
	*/
	static SetSalvAnex( vTabela, vResp ) {
		var NomeIten = {};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableAchat' ){
			NomeIten = {
				0: 'TipoAnexAchat',
				1: 'DescrAnexAchat',
				2: 'FileAnexAchat',
				3: 'FileAnexLabeAchat',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableCharp' ){
			NomeIten = {
				0: 'TipoAnexCharp',
				1: 'DescrAnexCharp',
				2: 'FileAnexCharp',
				3: 'FileAnexLabeCharp',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDobra' ){
			NomeIten = {
				0: 'TipoAnexDobra',
				1: 'DescrAnexDobra',
				2: 'FileAnexDobra',
				3: 'FileAnexLabeDobra',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDure' ){
			NomeIten = {
				0: 'TipoAnexDure',
				1: 'DescrAnexDure',
				2: 'FileAnexDure',
				3: 'FileAnexLabeDure',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMacro' ){
			NomeIten = {
				0: 'TipoAnexMacro',
				1: 'DescrAnexMacro',
				2: 'FileAnexMacro',
				3: 'FileAnexLabeMacro',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMeta' ){
			NomeIten = {
				0: 'TipoAnexMeta',
				1: 'DescrAnexMeta',
				2: 'FileAnexMeta',
				3: 'FileAnexLabeMeta',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTablePcend' ){
			NomeIten = {
				0: 'TipoAnexPcend',
				1: 'DescrAnexPcend',
				2: 'FileAnexPcend',
				3: 'FileAnexLabePcend',
			};
		};
		var Anexos = {};
		var TabeData = Core.Anexos.AtuaTableAnex( vTabela );
		TabeData.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		  	var AnexosCamp = {};
		  	AnexosCamp[ 'anexo_cada_iden' ] = TabeData.cell( rowIdx, 1 ).data().trim();
	  		AnexosCamp[ 'anexo_tipo' ] = $( TabeData.row( rowIdx ).node() ).find( '#' + NomeIten[0] ).val().trim();
	  		AnexosCamp[ 'anexo_descr' ] = $( TabeData.row( rowIdx ).node() ).find( '#' + NomeIten[1] ).val().trim();
			AnexosCamp[ 'anexo_arqui' ] = $( TabeData.row( rowIdx ).node() ).find( '#' + NomeIten[3] ).html().trim();
	  		AnexosCamp[ 'anexo_arqu64' ] = $( TabeData.row( rowIdx ).node() ).find( '#' + NomeIten[2] ).attr( 'data-arqu' );
			AnexosCamp[ 'anexo_arqui_ante' ] = TabeData.cell( rowIdx, 5 ).data();
	  		Anexos[ 'Lin' + rowIdx ] = AnexosCamp;
		});
		vResp( Anexos );
  	};
		
	/**
	 * Método para donwload
	 * no sistema
	 * 
	 * @param  vParam - Parametros para download
	 * @param  vResp - calback
	 * 
	 * @return calback
	 * @access public
	*/
	static SetDownAnex( vParam, vResp ) {
		if ( vParam[ 'DadoArqAnex' ] != '' ){
			var DowDoc = document.createElement('a');
			DowDoc.setAttribute( 'href', vParam[ 'DadoArqAnex' ] );
			DowDoc.setAttribute( 'download', vParam[ 'FileAnexLabe' ] );
			DowDoc.style.display = 'none';
			document.body.appendChild( DowDoc );
			DowDoc.click();
			document.body.removeChild( DowDoc );
			DowDoc = null;
			setTimeout( function(){
				vResp( 'ok' );
			}, 300);
		} else {
			var IdenAnex = '';
			
			if ( vParam[ 'IdenAchat' ] != undefined ){
				IdenAnex = vParam[ 'IdenAchat' ];
			};
			if ( vParam[ 'IdenCharp' ] != undefined ){
				IdenAnex = vParam[ 'IdenCharp' ];
			};
			if ( vParam[ 'IdenDobra' ] != undefined ){
				IdenAnex = vParam[ 'IdenDobra' ];
			};
			if ( vParam[ 'IdenDure' ] != undefined ){
				IdenAnex = vParam[ 'IdenDure' ];
			};
			if ( vParam[ 'IdenMacro' ] != undefined ){
				IdenAnex = vParam[ 'IdenMacro' ];
			};
			if ( vParam[ 'IdenMeta' ] != undefined ){
				IdenAnex = vParam[ 'IdenMeta' ];
			};
			if ( vParam[ 'IdenPcend' ] != undefined ){
				IdenAnex = vParam[ 'IdenPcend' ];
			};
			Core.SetAjax({
				evento:{
					IdenAnex: IdenAnex,
					FileAnexLabe: vParam[ 'FileAnexLabe' ],
					anexo_ensa_tabe: vParam[ 'anexo_ensa_tabe' ],
				}},
				'../../Comum/Anexos/GetDonwAnex/', function( vRespAjax ){
					if ( vRespAjax.status == 'sucesso' ){
						var DowDoc = document.createElement('a');
						DowDoc.setAttribute( 'href', vRespAjax.registros );
						DowDoc.setAttribute( 'download', vParam[ 'FileAnexLabe' ] );
						DowDoc.style.display = 'none';
						document.body.appendChild( DowDoc );
						DowDoc.click();
						document.body.removeChild( DowDoc );
						DowDoc = null;
					} else {
						Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
					};
					setTimeout( function(){
						vResp( vRespAjax );
					}, 300);
				},
			);
		};
	};
	
	/**
	 * Método para incluir
	 * no sistema
	 * 
	 * @param  vTabela - Id Tabela que sere implementada
	 * @param  vLinha - Linha da tabela a ser excluida
	 * @param  vResp - calback
	 * 
	 * @return calback
	 * @access public
	*/
	static SetDeleAnex( vTabela, vLinha, vResp ){
		var TabeData = Anexos.AtuaTableAnex( vTabela );
		var NomeIten = {};
		
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableAchat' ){
			NomeIten = {
				0: 'TipoAnexAchat',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableCharp' ){
			NomeIten = {
				0: 'TipoAnexCharp',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDobra' ){
			NomeIten = {
				0: 'TipoAnexDobra',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableDure' ){
			NomeIten = {
				0: 'TipoAnexDure',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMacro' ){
			NomeIten = {
				0: 'TipoAnexMacro',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTableMeta' ){
			NomeIten = {
				0: 'TipoAnexMeta',
			};
		};
		if ( $( vTabela ).attr( 'id' ) == 'AnexTablePcend' ){
			NomeIten = {
				0: 'TipoAnexPcend',
			};
		};
		$( TabeData.row( vLinha ).node() ).find( '#' + NomeIten[0] ).append( '<option value="-1">EXCLUIR</option>' );
		$( TabeData.row( vLinha ).node() ).find( '#' + NomeIten[0] ).val( -1 );
		$( TabeData.row( vLinha ).node() ).hide();
		vResp( TabeData.row( vLinha ).node() );
	}
};