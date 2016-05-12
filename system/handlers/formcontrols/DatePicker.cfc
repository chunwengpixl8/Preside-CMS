component {

	public string function index( event, rc, prc, args={} ) {
		if ( Len( Trim( args.relativeOperator ?: "" ) ) && IsTrue( args.relativeToCurrentDate ?: "" ) ) {
			var offset = Val( args.relativeOffset ?: "" );

			switch( args.relativeOperator ) {
				case "lt":
					args.maxDate = DateAdd( 'd', (-1 - offset), Now() );
				break;
				case "lte":
					args.maxDate = DateAdd( 'd', -offset, Now() );
				break;
				case "gt":
					args.minDate = DateAdd( 'd', 1 + offset, Now() );
				break;
				case "gte":
					args.minDate = DateAdd( 'd', offset, Now() );
				break;
			}
		}

		return renderView( view="/formcontrols/datepicker/index", args=args );
	}

}