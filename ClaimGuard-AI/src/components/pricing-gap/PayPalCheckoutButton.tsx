import React, { useEffect, useRef } from 'react';

interface PayPalCheckoutButtonProps {
  amountUsd: number;
  planName: string;
  onSuccess: (details: any) => void;
}

const PAYPAL_CLIENT_ID = 'BAAgEfMibOKAxliZZto8lnrD78-QtKUgNuk-oVlCNTld6gdoZ0AbFqxmLIWD8QZLpDGBQvEIUoNtZql2As';

export const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  amountUsd,
  planName,
  onSuccess
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'paypal-sdk-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const renderButtons = () => {
      if ((window as any).paypal && containerRef.current) {
        containerRef.current.innerHTML = '';
        try {
          (window as any).paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'paypal'
            },
            createOrder: (_data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  description: `${planName} License Buyout`,
                  amount: {
                    currency_code: 'USD',
                    value: amountUsd.toString()
                  }
                }]
              });
            },
            onApprove: (_data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                onSuccess(details);
              });
            },
            onError: (err: any) => {
              console.error('PayPal Smart Button Error:', err);
            }
          }).render(containerRef.current);
        } catch (e) {
          console.warn('PayPal Button render caught', e);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = renderButtons;
      document.body.appendChild(script);
    } else {
      if ((window as any).paypal) {
        renderButtons();
      } else {
        script.addEventListener('load', renderButtons);
      }
    }
  }, [amountUsd, planName]);

  return (
    <div className="w-full space-y-2">
      <div className="text-[11px] font-mono text-slate-300 flex items-center justify-between">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          🔒 256-Bit SSL Encrypted PayPal &amp; Cards
        </span>
        <span className="text-[10px] text-slate-400 font-mono">No PayPal Account Required</span>
      </div>
      <div ref={containerRef} className="min-h-[140px]" />
    </div>
  );
};
