import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Chat() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold mb-2">Virtual Gym Buddy</h1>
          <p className="text-muted-foreground">
            Chat with your AI fitness companion for advice and motivation.
          </p>
        </div>
        <ChatInterface />
      </motion.div>
    </AppLayout>
  );
}
