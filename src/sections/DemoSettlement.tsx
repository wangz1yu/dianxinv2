import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  User,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';
import { PaperPanel } from '@/components/editorial/PaperPanel';

interface Employee {
  id: number;
  name: string;
  phone: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
}

const mockEmployees: Employee[] = [
  { id: 1, name: '张三', phone: '138****1234', amount: 3500, status: 'pending' },
  { id: 2, name: '李四', phone: '139****5678', amount: 4200, status: 'pending' },
  { id: 3, name: '王五', phone: '137****9012', amount: 3800, status: 'pending' },
  { id: 4, name: '赵六', phone: '136****3456', amount: 4500, status: 'pending' },
];

export default function DemoSettlement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = employees.reduce((sum, emp) => sum + emp.amount, 0);

  const startSettlement = () => {
    setIsProcessing(true);
    setCompletedCount(0);
    
    // 逐个处理
    employees.forEach((emp, index) => {
      setTimeout(() => {
        setEmployees(prev => 
          prev.map(e => 
            e.id === emp.id ? { ...e, status: 'processing' } : e
          )
        );
        
        setTimeout(() => {
          setEmployees(prev => 
            prev.map(e => 
              e.id === emp.id ? { ...e, status: 'completed' } : e
            )
          );
          setCompletedCount(prev => prev + 1);
        }, 800);
      }, index * 1200);
    });

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, employees.length * 1200 + 1000);
  };

  const resetDemo = () => {
    setEmployees(mockEmployees);
    setCompletedCount(0);
    setShowSuccess(false);
    setIsProcessing(false);
  };

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
                  结算链路演示：<span className="text-gold-grad">T+0 发薪</span>
                </>
              }
              desc="保留现有演示交互，只把外观做成“纸面板 + 分隔线”的画册风格。"
            />

            <p className="mt-6 text-sm leading-[1.85] text-[rgba(20,18,14,0.72)]">
              T+0极速发薪，支持批量结算，资金实时到账。体验一键完成数百人发薪的便捷操作，
              大幅降低企业财务人力成本。
            </p>
            
            <div className="mt-6 space-y-3 border-t border-[rgba(20,18,14,0.12)]">
              {[
                { icon: Clock, text: 'T+0极速到账，资金秒级流转' },
                { icon: CheckCircle, text: '合规税务处理，降低用工风险' },
                { icon: User, text: '支持批量导入，一键完成发薪' },
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
                  <div>
                    <p className="text-[rgba(20,18,14,0.55)] text-sm">待结算总额</p>
                    <p className="text-3xl font-bold text-[hsl(var(--ink))]">¥{totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[rgba(20,18,14,0.55)] text-sm">结算人数</p>
                    <p className="text-3xl font-bold text-[hsl(var(--ink))]">{employees.length}人</p>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="p-6 space-y-3 bg-white/55">
                <AnimatePresence>
                  {employees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        employee.status === 'completed' 
                          ? 'bg-[rgba(34,197,94,0.10)] border border-[rgba(34,197,94,0.22)]' 
                          : employee.status === 'processing'
                          ? 'bg-[rgba(251,193,106,0.12)] border border-[rgba(251,193,106,0.28)]'
                          : 'bg-white/70 border border-[rgba(20,18,14,0.10)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          employee.status === 'completed' 
                            ? 'bg-[rgba(34,197,94,0.85)]' 
                            : employee.status === 'processing'
                            ? 'bg-[rgba(251,193,106,0.95)]'
                            : 'bg-[rgba(20,18,14,0.32)]'
                        }`}>
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[rgba(20,18,14,0.92)] font-medium">{employee.name}</p>
                          <p className="text-[rgba(20,18,14,0.55)] text-sm">{employee.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[rgba(20,18,14,0.92)] font-medium">¥{employee.amount.toLocaleString()}</span>
                        {employee.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-[rgba(34,197,94,0.85)]" />
                        )}
                        {employee.status === 'processing' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="w-5 h-5 text-[rgba(251,193,106,0.95)]" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 bg-white/55">
                <AnimatePresence mode="wait">
                  {!showSuccess ? (
                    <motion.div
                      key="action"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button 
                        className="w-full rounded-xl py-6 text-lg font-medium"
                        onClick={startSettlement}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-5 h-5" />
                            </motion.div>
                            结算中... {completedCount}/{employees.length}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            一键结算
                            <ArrowRight className="w-5 h-5" />
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
                      <div className="flex items-center justify-center gap-2 text-[rgba(34,197,94,0.9)] mb-4">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-lg font-medium">结算完成！</span>
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
