import React, { useState } from 'react';
import Button from '../ui/Button';
import { useAppContext } from '../../hooks/useAppContext';
import { LoaderIcon } from '../ui/icons';

const DbTestScreen: React.FC = () => {
    const { setScreen } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const runTest = async () => {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch('/api/test/db');
            const data = await response.json();
            setResult(data);
        } catch (error: any) {
            setResult({ success: false, message: "Fetch failed.", error: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Database Connection Test</h2>
                <p className="text-slate-300 mb-8">
                    This utility attempts to create and read a record from the `test_table` in your database.
                    Ensure you have created this table before running the test.
                </p>

                <div className="space-y-4">
                    <Button onClick={runTest} disabled={isLoading}>
                        {isLoading ? <LoaderIcon className="w-6 h-6" /> : 'Run Test'}
                    </Button>
                    <Button variant="secondary" onClick={() => setScreen('welcome')}>
                        Back to Welcome
                    </Button>
                </div>

                {result && (
                    <div className="mt-8 text-left bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Test Result:</h3>
                        <pre className="text-sm text-slate-200 whitespace-pre-wrap break-all">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DbTestScreen;
