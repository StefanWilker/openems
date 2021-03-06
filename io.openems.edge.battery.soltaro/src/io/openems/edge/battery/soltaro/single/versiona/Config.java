package io.openems.edge.battery.soltaro.single.versiona;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import io.openems.edge.battery.soltaro.BatteryState;

@ObjectClassDefinition( //
		name = "BMS Soltaro Single Rack Version A", //
		description = "Implements the Soltaro battery rack system.")
@interface Config {
	String id() default "bms0";

	boolean enabled() default true;

	@AttributeDefinition(name = "Modbus-ID", description = "ID of Modbus brige.")
	String modbus_id() default "modbus0";

	@AttributeDefinition(name = "Modbus Unit-ID", description = "The Unit-ID of the Modbus device.")
	int modbusUnitId() default 1;

	@AttributeDefinition(name = "Capacity [Wh]", description = "The capacity of the Battery Rack.")
	int capacity() default 50;

	@AttributeDefinition(name = "Battery state", description = "Switches the battery into the given state, if default is used, battery state is set automatically")
	BatteryState batteryState() default BatteryState.DEFAULT;

	@AttributeDefinition(name = "Modbus target filter", description = "This is auto-generated by 'Modbus-ID'.")
	String Modbus_target() default "";

	String webconsole_configurationFactory_nameHint() default "BMS Soltaro Single Rack Version A [{id}]";
}