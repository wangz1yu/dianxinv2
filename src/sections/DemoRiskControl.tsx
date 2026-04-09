import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Search,
  FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';
import { PaperPanel } from '@/components/editorial/PaperPanel';

interface RiskItem {
  id: number;
  name: string;
  idCard: string;
  riskType: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'checking' | 'passed' | 'rejected';
}

const mockRisks: RiskItem[] = [
  { id: 1, name: '张三', idCard: '3401********1234', riskType: '身份核验', riskLevel: 'low', status: 'checking' },
  { id: 2, name: '李四', idCard: '3401********5678', riskType: '信用评估', riskLevel: 'low', status: 'checking' },
  { id: 3, name: '王五', idCard: '3401********9012', riskType: '异常检测', riskLevel: 'medium', status: 'checking' },
  { id: 4, name: '赵六', idCard: '3401********3456', riskType: '身份核验', riskLevel: 'low', status: 'checking' },
];

export default function DemoRiskControl() {
  const [risks, setRisks] = useState<RiskItem[]>(mockRisks);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResult(false);
    
    // 模拟扫描进度
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // 逐个处理风险检测
    risks.forEach((risk, index) => {
      setTimeout(() => {
        setRisks(prev => 
          prev.map(r => 
            r.id === risk.id 
              ? { ...r, status: risk.riskLevel === 'high' ? 'rejected' : 'passed' }
              : r
          )
        );
      }, 500 + index * 400);
    });

    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3000);
  };

  const resetDemo = () => {
    setRisks(mockRisks);
    setScanProgress(0);
    setShowResult(false);
    setIsScanning(false);
  };

  const passedCount = risks.filter(r => r.status === 'passed').length;
  const rejectedCount = risks.filter(r => r.status === 'rejected').length;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <EditorialSectionHeader
              label="DEMO / 互动演示"
              title={
                <>
                  智能风控审查：<span className="text-gold-grad">多维校验</span>
                </>
              }
              desc="AI驱动的智能风控系统，实时检测用工风险。涵盖身份核验、信用评估、异常行为检测等多维度模型。"
            />

            <p className="mt-6 text-sm leading-[1.85] text-[rgba(20,18,14,0.72)]">
              AI驱动的智能风控系统，实时检测用工风险。涵盖身份核验、信用评估、
              异常行为检测等多维度风控模型，保障企业用工安全。
            </p>
            
            <div className="mt-6 space-y-3 border-t border-[rgba(20,18,14,0.12)]">
              {[
                { icon: Search, text: '实时身份核验，对接公安系统' },
                { icon: AlertTriangle, text: '信用评分模型，预测用工风险' },
                { icon: FileCheck, text: '异常行为检测，防范欺诈风险' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b border-[rgba(20,18,14,0.08)]">
                  <div className="w-10 h-10 bg-white/65 border border-[rgba(20,18,14,0.10)] rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[rgba(20,18,14,0.72)]" />
                  </div>
                  <span className="text-[rgba(20,18,14,0.84)]">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PaperPanel className="overflow-hidden">
              {/* Header */}
              <div
                className="p-6 border-b border-[rgba(20,18,14,0.10)]"
                style={{
                  background:
                    "radial-gradient(700px 240px at 18% 0%, rgba(251,193,106,0.18), transparent 58%), rgba(255,255,255,0.65)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[rgba(251,193,106,0.12)] border border-[rgba(251,193,106,0.25)] rounded-2xl flex items-center justify-center">
                      <Shield className="w-7 h-7 text-[rgba(20,18,14,0.72)]" />
                    </div>
                    <div>
                      <p className="text-[rgba(20,18,14,0.55)] text-sm">风控系统</p>
                      <p className="text-[hsl(var(--ink))] font-bold text-lg">智能风险检测</p>
                    </div>
                  </div>
                  {showResult && (
                    <div className="text-right">
                      <p className="text-[rgba(20,18,14,0.55)] text-sm">检测结果</p>
                      <p className="text-[hsl(var(--ink))] font-bold">
                        <span className="text-[rgba(34,197,94,0.85)]">{passedCount}</span> 通过 /{' '}
                        <span className="text-[rgba(239,68,68,0.85)]">{rejectedCount}</span> 异常
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {isScanning && (
                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between text-sm text-[rgba(20,18,14,0.55)] mb-2">
                    <span>正在扫描...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-2 bg-[rgba(20,18,14,0.12)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      className="h-full bg-gold-grad"
                    />
                  </div>
                </div>
              )}

              {/* Risk List */}
              <div className="p-6 space-y-3 bg-white/55">
                <AnimatePresence>
                  {risks.map((risk) => (
                    <motion.div
                      key={risk.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        risk.status === 'passed' 
                          ? 'bg-[rgba(34,197,94,0.10)] border border-[rgba(34,197,94,0.22)]' 
                          : risk.status === 'rejected'
                          ? 'bg-[rgba(239,68,68,0.10)] border border-[rgba(239,68,68,0.22)]'
                          : 'bg-white/70 border border-[rgba(20,18,14,0.10)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          risk.status === 'passed' 
                            ? 'bg-[rgba(34,197,94,0.85)]' 
                            : risk.status === 'rejected'
                            ? 'bg-[rgba(239,68,68,0.85)]'
                            : 'bg-[rgba(251,193,106,0.95)]'
                        }`}>
                          {risk.status === 'passed' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : risk.status === 'rejected' ? (
                            <XCircle className="w-5 h-5 text-white" />
                          ) : (
                            <RefreshCw className="w-5 h-5 text-white animate-spin" />
                          )}
                        </div>
                        <div>
                          <p className="text-[rgba(20,18,14,0.92)] font-medium">{risk.name}</p>
                          <p className="text-[rgba(20,18,14,0.55)] text-sm">{risk.idCard}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[rgba(20,18,14,0.82)] text-sm">{risk.riskType}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          risk.riskLevel === 'low' 
                            ? 'bg-[rgba(34,197,94,0.14)] text-[rgba(34,197,94,0.85)]'
                            : risk.riskLevel === 'medium'
                            ? 'bg-[rgba(251,193,106,0.14)] text-[rgba(20,18,14,0.72)]'
                            : 'bg-[rgba(239,68,68,0.14)] text-[rgba(239,68,68,0.85)]'
                        }`}>
                          {risk.riskLevel === 'low' ? '低风险' : risk.riskLevel === 'medium' ? '中风险' : '高风险'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 bg-white/55">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="action"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button 
                        className="w-full rounded-xl py-6 text-lg font-medium"
                        onClick={startScan}
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <span className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            检测中...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            开始风控检测
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                        <FileCheck className="w-6 h-6" />
                        <span className="text-lg font-medium">风控检测完成</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="rounded-full bg-white/60"
                        onClick={resetDemo}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新演示
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </PaperPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
