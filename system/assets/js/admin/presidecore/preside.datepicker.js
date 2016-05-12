( function( $ ){


	$('.date-picker').each( function() {
		var $thisPicker      = $( this )
		  , pickerConfig     = $thisPicker.data()
		  , relativeToField  = pickerConfig.relativeToField  || ""
		  , relativeOperator = pickerConfig.relativeOperator || ""
		  , relativeOffset   = parseInt( pickerConfig.relativeOffset || "" )
		  , conf, form, relativeField, datePicker;

		if ( isNaN( relativeOffset ) ) {
			relativeOffset = 0;
		}

		conf = {
			  autoclose : true
			, startDate : pickerConfig.startDate || null
			, endDate   : pickerConfig.endDate   || null
			, onRender : function( date ){
				var dateValue  = date.valueOf()
				  , startDate  = this.startDate
				  , endDate    = this.endDate

				if ( typeof startDate != 'undefined' && startDate > dateValue ) {
					return 'disabled';
				}

				if ( typeof endDate != 'undefined' && endDate < dateValue ) {
					return 'disabled';
				}

				return '';
			}
		};

		$thisPicker.datepicker( conf ).next().on( "click", function(){
			$( this ).prev().focus();
		});

		datePicker = $thisPicker.data( "datepicker" );

		if ( relativeToField.length || relativeOperator.length ) {
			$form          = $thisPicker.closest( "form" );
			$relativeField = $form.find( "[name=" + relativeToField + "]" );

			if ( $relativeField.length ) {
				var currentDate = $relativeField.val();

				if ( currentDate.length ) {
					currentDate = new Date( currentDate );
					switch( relativeOperator ) {
						case "lt":
							currentDate.setDate( currentDate.getDate() - 1 );
						case "lte":
							currentDate.setDate( currentDate.getDate() - relativeOffset );
							datePicker.setEndDate( currentDate );
						break;

						case "gt":
							currentDate.setDate( currentDate.getDate() + 1 );
						case "gte":
							currentDate.setDate( currentDate.getDate() + relativeOffset );
							datePicker.setStartDate( currentDate );
						break;
					}
				}

				$relativeField.on( "changeDate", function( e ){
					var newDate = new Date( e.date );

					switch( relativeOperator ) {
						case "lt":
							newDate.setDate( newDate.getDate() - 1 );
						case "lte":
							newDate.setDate( newDate.getDate() - relativeOffset );
							datePicker.setEndDate( newDate );
						break;

						case "gt":
							newDate.setDate( newDate.getDate() + 1 );
						case "gte":
							newDate.setDate( newDate.getDate() + relativeOffset );
							datePicker.setStartDate( newDate );
						break;
					}
				} );

			}
		}
	});

} )( presideJQuery );