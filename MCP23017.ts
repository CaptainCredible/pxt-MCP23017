/**
 *  MCP23017 control blocks
 */

enum SET_PORT {
    //% block=PORT_A
    A = 0,
    //% block=PORT_B
    B = 256
}

enum REG_PIO {
    //% block=PORT_A
    A = 4608,
    //% block=PORT_B
    B = 4609
}
enum ADDRESS {                     // address for MCP23017 (configurable by tying pins 15,16,17 on the mcp23017 high or low)
    //% block=0x20
    A20 = 0x20,               // 
    //% block=0x21
    A21 = 0x21,                // 
    //% block=0x22
    A22 = 0x22,                // 
    //% block=0x23
    A23 = 0x23,                // 
    //% block=0x24
    A24 = 0x24,                // 
    //% block=0x25
    A25 = 0x25,                // 
    //% block=0x26
    A26 = 0x26,                // 
    //% block=0x27
    A27 = 0x27                // 
}

/**
 * Blocks
 */
"//% weight=100 color=#0fbc12 icon="
namespace MCP23017 {
    //% block
    export function clearAllOuputsOn(adress: ADDRESS, port: REG_PIO){
        pins.i2cWriteNumber(adress, port + 0, NumberFormat.UInt16BE)
    }


    //% block
    export function setOutputs(adress: ADDRESS, port: REG_PIO, value: number) {
        pins.i2cWriteNumber(adress, port + value, NumberFormat.UInt16BE)
    }

    //% block
    export function setAsOutput(adress: ADDRESS, port: SET_PORT) {
        pins.i2cWriteNumber(adress, port + 0x00, NumberFormat.UInt16BE)
    }

    //% block
    export function readRegister(addr: ADDRESS, reg: REG_PIO): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.Int8LE);
        return pins.i2cReadNumber(addr, NumberFormat.Int8LE)
    }

    //% block
    export function ReadNotAnd(addr: ADDRESS, reg: REG_PIO, value: number): boolean {
        return (!(readRegister(addr, reg) & value))
    }

}
