/**
*
*	Comparison Widget for you by Zabludovskiy Grigoriy ☄ 2016 ©
*
*/



( function ( w ) {

"use strict";

var $w = w, $d = $w.document;

var helpers = {};

helpers.createDOMElement = function ( tag, text, className ) {

	var el = $d.createElement( tag );

	if ( text !== undefined ) {

		var tn = $d.createTextNode( text );

		el.appendChild( tn );

	}

	if ( className !== undefined ) {

		el.className = className;

	}

	return el;

};

$w.addEventListener( "load", init );

function init() {

	var defaultPanelHeight = panel.offsetHeight + "px";

	panel.style.height = defaultPanelHeight;

	reset_btn.onclick = function () {

		result_table.innerHTML = "";

		panel.style.height = defaultPanelHeight;

	};

	var compareInputs = $d.querySelectorAll( "input.ftc" );

	var contentArr = [];

	var headingsArr = [];

	compare_btn.onclick = function () {

		result_table.innerHTML = "";

		for ( var idx = 0; compareInputs[ idx ]; idx++ ) {

			if ( !( compareInputs[ idx ].matches( "input:valid" ) ) ) { return; }

			contentArr[ idx ] = compareInputs[ idx ].files[ 0 ];

		}

		contentArr.forEach( convertFileIntoArr );

	};

	function convertFileIntoArr( cf, i, a ) {

		headingsArr[ i ] = cf.name;

		var reader = new FileReader();

		reader.readAsText( cf );

		reader.onload = function ( event ) {

			var FileContent = event.target.result;

			a[ i ] = FileContent.split( /\r\n/ );

			if ( a[ i + 1 ] === undefined ) { showResults(); };

		};

	}

	function showResults() {

		var contentArrMaxLength = contentArr.reduce( function ( pv, cv, i, a ) {

			if ( pv.length > cv.length ) {

				return pv.length;

			}

			else {

				return cv.length;

			}

		} );

		for ( var idx = 0; idx < contentArrMaxLength; idx++ ) {

			if ( idx === 0 ) {

				var currentTRow = helpers.createDOMElement( "TR", undefined, "info" );

				headingsArr.forEach( function ( cv, i, a ) {

					currentTRow.appendChild( helpers.createDOMElement( "TH", cv ) );

				} );

				result_table.appendChild( currentTRow );

			}

			var currentTRow = helpers.createDOMElement( "TR" );

			contentArr.forEach( function ( arrItem, aii, arrNode ) {

				var TDText, TDClass;

				if ( arrItem[ idx ] === undefined ) {

					TDText = "No data";

					TDClass = "no_data";

				}

				else {

					TDText = arrItem[ idx ];

					var strCoincidence = arrNode.every( function ( arrItemVal, aivi, aThis ) {

						return ( arrItemVal.some( function ( cv, i, a ) { return cv === arrItem[ idx ]; } ) );

					} );

					var strAndIdxCoincidence = arrNode.every( function ( arrItemVal, aivi, aThis ) {

						return arrItemVal[ idx ] === arrItem[ idx ];

					} );

					if ( strCoincidence && !strAndIdxCoincidence ) {

						TDClass = "success";

					}

					else if ( strAndIdxCoincidence ) {

						TDClass = "info";

					}

					else {

						TDClass = "danger";

					}

				}

				var currentTData = helpers.createDOMElement( "TD", TDText, TDClass );

				currentTRow.appendChild( currentTData );

			} );

			result_table.appendChild( currentTRow );

		}

		result_table.innerHTML = "<tbody>" + result_table.innerHTML + "</tbody>";

		panel.style.height = parseInt( defaultPanelHeight ) + result_table.offsetHeight + "px";;

	}

}

} )( window );