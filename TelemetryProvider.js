"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryProvider = void 0;
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const api_1 = require("@opentelemetry/api");
const TelemetryConstants_1 = require("./TelemetryConstants");
class TelemetryProvider {
    // constructor creates a new TelemetryProvider for tracing purposes
    constructor() {
        // private TelemetryExporter: AzureMonitorTraceExporter = new AzureMonitorTraceExporter({
        //     connectionString: TelemetryConstants.ConnectionString
        // });
        this.TelemetryExporter = new sdk_trace_base_1.ConsoleSpanExporter();
        this.TelemetryProcessor = new sdk_trace_base_1.BatchSpanProcessor(this.TelemetryExporter);
        TelemetryProvider.TelemetryResource =
            resources_1.Resource.default().merge(new resources_1.Resource({
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: TelemetryConstants_1.TelemetryConstants.ServiceName,
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_VERSION]: TelemetryConstants_1.TelemetryConstants.ServiceVersion,
            }));
        TelemetryProvider.Provider = new sdk_trace_node_1.NodeTracerProvider({
            resource: TelemetryProvider.TelemetryResource,
        });
        TelemetryProvider.Provider.register();
    }
    getTelemetryTracer(TracerName, TracerVersion) {
        return api_1.trace.getTracer(TracerName, TracerVersion);
    }
}
exports.TelemetryProvider = TelemetryProvider;
//# sourceMappingURL=TelemetryProvider.js.map