package io.openems.edge.controller.symmetric.reactivepowervoltagecharacteristic;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition( //
		name = "Controller Reactive-Power Voltage Characteristic Symmetric", //
		description = "Defines a reactive power voltage characteristic for storage system.")
@interface Config {

	String id() default "ctrlRctvPwrVltgChrctrstc0";

	boolean enabled() default true;

	@AttributeDefinition(name = "Ess-ID", description = "ID of Ess device.")
	String ess_id();

	@AttributeDefinition(name = "Meter-ID", description = "ID of Meter.")
	String meter_id();

	@AttributeDefinition(name = "Q by U characteristic ", description = "The graph values for power and percentage")
	String percentQ() default "[{ \"voltage\" : 0.9,\"percent\" : 60 }, { \"voltage\":0.93,\"percent\": 0},{\"voltage\":1.07 ,\"percent\": 0 },{\"voltage\": 1.1 ,\"percent\": -60 }]";

	@AttributeDefinition(name = "Nominal Voltage [V]", description = "The nominal voltage of the grid")
	float nominalVoltage() default 230f;

	@AttributeDefinition(name = "Ess target filter", description = "This is auto-generated by 'Ess-ID'.")
	String ess_target() default "";

	@AttributeDefinition(name = "Meter target filter", description = "This is auto-generated by 'Meter-ID'.")
	String meter_target() default "";

	String webconsole_configurationFactory_nameHint() default "Controller Reactive-Power Voltage Characteristic Symmetric [{id}]";
}