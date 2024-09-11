import { TRPCOutput } from "@komandero/clientTRPC";

export type PrinterJobs = TRPCOutput['organizations']['printer_job']['get_all']['printer_jobs'];
export type PrinterJob = PrinterJobs[0];
