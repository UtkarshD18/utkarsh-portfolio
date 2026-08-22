import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SimulationMessage {
  id: string;
  sender: 'user' | 'router' | 'agent';
  agentName?: string;
  text: string;
  accuracy?: string;
  latency?: string;
}

@Component({
  selector: 'app-b1gcrm-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="b1g-studio liquid-glass">
      <!-- Studio Header -->
      <div class="studio-topbar">
        <div class="studio-brand">
          <span class="studio-logo">B1G</span>
          <div class="studio-titles">
            <span class="main-title">B1G-CRM Enterprise Multi-Agent Studio</span>
            <span class="sub-title">LangGraph StateGraph Router · PostgreSQL pgvector RAG</span>
          </div>
        </div>
        <div class="studio-actions">
          <div class="live-pill">
            <span class="dot"></span>
            <span>Live Multi-Agent Mesh (208K+ LoC)</span>
          </div>
        </div>
      </div>

      <!-- Main Visual Flow Canvas -->
      <div class="studio-canvas">
        <!-- Canvas Grid Background -->
        <div class="flow-graph">
          <!-- Node 1: Input Trigger -->
          <div class="flow-node trigger-node">
            <div class="node-header">
              <span class="node-type">TRIGGER</span>
              <span class="node-status">ACTIVE</span>
            </div>
            <div class="node-body">
              <span class="node-title">WhatsApp / Instagram DM</span>
              <span class="node-desc">Omni-channel Socket.io event stream</span>
            </div>
            <div class="port output-port"></div>
          </div>

          <!-- Connecting Line -->
          <div class="connector-line">
            <span class="pulse-packet"></span>
          </div>

          <!-- Node 2: LangGraph StateGraph Triage Router -->
          <div class="flow-node router-node">
            <div class="node-header">
              <span class="node-type">LANGGRAPH ROUTER</span>
              <span class="node-metric">98% Accuracy</span>
            </div>
            <div class="node-body">
              <span class="node-title">StateGraph Triage Router</span>
              <span class="node-desc">-45% Prompt Token Reduction</span>
            </div>
            <div class="port input-port"></div>
            <div class="port output-port"></div>
          </div>

          <!-- Connecting Line -->
          <div class="connector-line">
            <span class="pulse-packet delayed"></span>
          </div>

          <!-- Node 3: Specialist Agent Clusters -->
          <div class="agents-cluster">
            <div class="flow-node agent-node" [class.highlight]="activeAgent() === 'rag'">
              <div class="node-header">
                <span class="node-type">RAG AGENT</span>
                <span class="node-metric">pgvector</span>
              </div>
              <span class="node-title">Support RAG (Cosine Search)</span>
            </div>

            <div class="flow-node agent-node" [class.highlight]="activeAgent() === 'sql'">
              <div class="node-header">
                <span class="node-type">SQL AGENT</span>
                <span class="node-metric">Direct SQL</span>
              </div>
              <span class="node-title">SQL Order Tracker (0 Hallucination)</span>
            </div>

            <div class="flow-node agent-node" [class.highlight]="activeAgent() === 'sales'">
              <div class="node-header">
                <span class="node-type">SALES AGENT</span>
                <span class="node-metric">Context Guard</span>
              </div>
              <span class="node-title">Lead Qualification &amp; Quotation</span>
            </div>
          </div>
        </div>

        <!-- Live Interactive Simulation Drawer -->
        <div class="simulation-drawer">
          <div class="sim-header">
            <span class="sim-title">INTERACTIVE AGENT TRIAGE SIMULATOR:</span>
            <div class="sim-buttons">
              <button class="sim-btn" (click)="simulateQuery('order')">Simulate Order Inquiry</button>
              <button class="sim-btn" (click)="simulateQuery('support')">Simulate Support Query</button>
              <button class="sim-btn" (click)="simulateQuery('sales')">Simulate Sales Quote</button>
            </div>
          </div>

          <div class="sim-log-window">
            @for (msg of simulationLogs(); track msg.id) {
              <div class="log-entry" [class]="'entry-' + msg.sender">
                <span class="log-tag">[{{ msg.agentName || msg.sender | uppercase }}]</span>
                <span class="log-text">{{ msg.text }}</span>
                @if (msg.latency) {
                  <span class="log-lat">⚡ {{ msg.latency }}</span>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .b1g-studio {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: #09090d;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
      margin: 2rem 0;
    }
    .studio-topbar {
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1rem 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .studio-brand {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }
    .studio-logo {
      background: #3b82f6;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      font-size: 0.85rem;
      padding: 0.35rem 0.65rem;
      border-radius: 6px;
      letter-spacing: 0.05em;
    }
    .studio-titles {
      display: flex;
      flex-direction: column;
    }
    .main-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
    }
    .sub-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
    }
    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
    }
    .live-pill .dot {
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 6px #3b82f6;
    }

    /* Canvas Flow */
    .studio-canvas {
      padding: 2rem;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px) 0 0 / 24px 24px, #07070a;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .flow-graph {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .flow-node {
      background: rgba(18, 18, 26, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 1.2rem 1.4rem;
      min-width: 220px;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      position: relative;
      transition: all 0.3s ease;
    }
    .flow-node.highlight {
      border-color: #3b82f6;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      transform: scale(1.03);
    }
    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
    }
    .node-type { color: #8e8e9f; }
    .node-status { color: #00e676; }
    .node-metric { color: #3b82f6; }
    .node-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #ffffff;
    }
    .node-desc {
      font-size: 0.72rem;
      color: #8e8e9f;
    }
    .agents-cluster {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .agent-node {
      padding: 0.85rem 1.2rem;
      min-width: 260px;
    }
    .connector-line {
      flex: 1;
      height: 2px;
      background: rgba(255, 255, 255, 0.15);
      position: relative;
      min-width: 40px;
    }
    .pulse-packet {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #3b82f6;
      border-radius: 50%;
      top: -3px;
      box-shadow: 0 0 8px #3b82f6;
      animation: move-packet 2s infinite linear;
    }
    .pulse-packet.delayed { animation-delay: 1s; }
    @keyframes move-packet {
      0% { left: 0%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 100%; opacity: 0; }
    }

    /* Simulation Drawer */
    .simulation-drawer {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 1.4rem;
    }
    .sim-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .sim-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #8e8e9f;
      letter-spacing: 0.12em;
    }
    .sim-buttons {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .sim-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      padding: 0.35rem 0.85rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .sim-btn:hover {
      background: #3b82f6;
      border-color: #3b82f6;
    }
    .sim-log-window {
      background: #050508;
      border-radius: 6px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-height: 160px;
      overflow-y: auto;
    }
    .log-entry {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .log-tag { color: #8e8e9f; font-size: 0.7rem; flex-shrink: 0; }
    .entry-user .log-text { color: #f5f5f7; word-break: break-word; }
    .entry-router .log-text { color: #3b82f6; word-break: break-word; }
    .entry-agent .log-text { color: #00e676; word-break: break-word; }
    .log-lat { font-size: 0.68rem; color: #ffc01e; margin-left: auto; flex-shrink: 0; }

    @media (max-width: 768px) {
      .agent-studio-box {
        margin: 1.5rem 0;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        box-sizing: border-box;
      }
      .studio-toolbar {
        padding: 0.8rem 1rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
      }
      .studio-canvas {
        padding: 1rem;
        gap: 1.2rem;
      }
      .flow-graph {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }
      .flow-node {
        min-width: unset;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
      }
      .agents-cluster {
        width: 100%;
      }
      .agents-grid {
        grid-template-columns: 1fr;
        gap: 0.6rem;
      }
      .sub-agent-node {
        min-width: unset;
        width: 100%;
        box-sizing: border-box;
      }
      .studio-footer {
        padding: 1rem;
      }
      .sim-buttons {
        flex-direction: column;
        width: 100%;
      }
      .sim-btn {
        width: 100%;
        text-align: center;
      }
      .log-entry {
        flex-wrap: wrap;
        gap: 0.3rem;
      }
    }
  `]
})
export class B1gcrmPreviewComponent {
  readonly activeAgent = signal<'rag' | 'sql' | 'sales'>('sql');

  readonly simulationLogs = signal<SimulationMessage[]>([
    { id: '1', sender: 'user', text: '"Where is my order #B1G-9482?"' },
    { id: '2', sender: 'router', agentName: 'StateGraph Router', text: 'Triage Route matched: [SQL Order Tracker] (98% confidence)' },
    { id: '3', sender: 'agent', agentName: 'SQL Order Tracker', text: 'Direct PostgreSQL query executed: Order #B1G-9482 shipped via BlueDart.', latency: '14ms' }
  ]);

  simulateQuery(type: 'order' | 'support' | 'sales'): void {
    if (type === 'order') {
      this.activeAgent.set('sql');
      this.simulationLogs.set([
        { id: '1', sender: 'user', text: '"Track order status for inv_8829"' },
        { id: '2', sender: 'router', agentName: 'LangGraph Router', text: 'StateGraph Triage matched: [SQL Order Tracker]' },
        { id: '3', sender: 'agent', agentName: 'SQL Order Tracker', text: 'Order status retrieved from PostgreSQL database with 0 hallucination.', latency: '12ms' }
      ]);
    } else if (type === 'support') {
      this.activeAgent.set('rag');
      this.simulationLogs.set([
        { id: '1', sender: 'user', text: '"How do I configure WhatsApp webhook retry rules?"' },
        { id: '2', sender: 'router', agentName: 'LangGraph Router', text: 'StateGraph Triage matched: [Support RAG / pgvector]' },
        { id: '3', sender: 'agent', agentName: 'Support RAG', text: 'Cosine similarity search over knowledge base returned 3 relevant chunks.', latency: '48ms' }
      ]);
    } else {
      this.activeAgent.set('sales');
      this.simulationLogs.set([
        { id: '1', sender: 'user', text: '"Need enterprise pricing for 50 agents"' },
        { id: '2', sender: 'router', agentName: 'LangGraph Router', text: 'StateGraph Triage matched: [Sales Lead Qualification]' },
        { id: '3', sender: 'agent', agentName: 'Sales Agent', text: 'Lead context captured with sliding window truncation guard.', latency: '22ms' }
      ]);
    }
  }
}
