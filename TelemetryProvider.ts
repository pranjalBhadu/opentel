import opentelemetry from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {AzureMonitorTraceExporter} from "@azure/monitor-opentelemetry-exporter"
import { BatchSpanProcessor, ConsoleSpanExporter, Tracer } from "@opentelemetry/sdk-trace-base";
import { trace }  from "@opentelemetry/api";
import { TelemetryConstants } from "./TelemetryConstants";

export class TelemetryProvider{
    private static TelemetryResource: Resource;
    private static Provider: NodeTracerProvider;
    // private TelemetryExporter: AzureMonitorTraceExporter = new AzureMonitorTraceExporter({
    //     connectionString: TelemetryConstants.ConnectionString
    // });
    private TelemetryExporter: ConsoleSpanExporter = new ConsoleSpanExporter()
    private TelemetryProcessor: BatchSpanProcessor = new BatchSpanProcessor(this.TelemetryExporter);

    // constructor creates a new TelemetryProvider for tracing purposes
    constructor(){
        TelemetryProvider.TelemetryResource =
        Resource.default().merge(
                new Resource({
                    [SemanticResourceAttributes.SERVICE_NAME]: TelemetryConstants.ServiceName,
                    [SemanticResourceAttributes.SERVICE_VERSION]: TelemetryConstants.ServiceVersion,
                })
            );

        TelemetryProvider.Provider = new NodeTracerProvider({
            resource: TelemetryProvider.TelemetryResource,
        });

        TelemetryProvider.Provider.register();
    }

    public getTelemetryTracer(TracerName: string, TracerVersion: string){
        return trace.getTracer(TracerName, TracerVersion)
    }

}