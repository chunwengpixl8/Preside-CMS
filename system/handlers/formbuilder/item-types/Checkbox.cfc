component {

	private string function renderInput( event, rc, prc, args={} ) {
		var controlName = args.name ?: "";

		return renderFormControl(
			  argumentCollection = args
			, name               = controlName
			, type               = "checkbox"
			, context            = "formbuilder"
			, id                 = args.id                ?: controlName
			, layout             = ""
			, labels		 	 = args.labels            ?: ""
			, checkboxLabel		 = args.checkboxLabel     ?: ""
			, defaultValue		 = IsTrue( args.defaultChecked ?: "" )
			, required           = IsTrue( args.mandatory      ?: "" )
		);
	}
}