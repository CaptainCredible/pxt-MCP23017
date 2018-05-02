
/**
 *  MCP23017-control blocks
 */

let outputABuffer = 0;
let outputBBuffer = 0;

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
    B = 4864
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
    export function clearAllOuputsOn(adress: ADDRESS, port: REG_PIO) {
        pins.i2cWriteNumber(adress, port + 0, NumberFormat.UInt16BE)
    }

    //% block
    export function setOutputA(bit: number) {
        outputABuffer = outputABuffer | (1 << bit)
    }

    //% block
    export function clearOutputA(bit: number) {
        let tempMask = 1 << bit
        tempMask = tempMask ^ 0B11111111
        outputABuffer = outputABuffer & tempMask
    }

    //% block
    export function updateOutputAOn(adress: ADDRESS) {
        writeNumberToPort(adress, 4608, outputABuffer)
    }

    //% block 
    export function clearOutputABuffer() {
        outputABuffer = 0
    }

    //% block
    export function setOutputB(bit: number) {
        outputABuffer = outputBBuffer | (1 << bit)
    }

    //% block
    export function clearOutputB(bit: number) {
        let tempMask = 1 << bit
        tempMask = tempMask ^ 0B11111111
        outputBBuffer = outputBBuffer & tempMask
    }

    //% block
    export function updateOutputBOn(adress: ADDRESS) {
        writeNumberToPort(adress, 4608, outputBBuffer)
    }

    //% block
    export function clearOutputBBuffer() {
        outputBBuffer = 0
    }

    //% block
    export function writeNumberToPort(adress: ADDRESS, port: REG_PIO, value: number) {
        pins.i2cWriteNumber(adress, port + value, NumberFormat.UInt16BE)
    }

    //% block
    export function setPortAsOutput(adress: ADDRESS, port: SET_PORT) {
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
