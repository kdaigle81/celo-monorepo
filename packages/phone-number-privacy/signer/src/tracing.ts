import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { Resource } from '@opentelemetry/resources'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const options = {
  tags: [],
  endpoint: process.env.TRACER_ENDPOINT,
  //'http://grafana-agent.grafana-agent:14268/api/traces',
}

// Optionally register automatic instrumentation libraries
registerInstrumentations({
  instrumentations: [],
})

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.TRACING_SERVICE_NAME,
    //'testing-signer-tracing',
    [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
  })
)

const provider = new WebTracerProvider({
  resource: resource,
})
const exporter = new JaegerExporter(options)
const processor = new BatchSpanProcessor(exporter)
provider.addSpanProcessor(processor)

provider.register()