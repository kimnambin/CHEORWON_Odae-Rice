import {Badge} from '@/components/ui/badge';

type RiceStatus = 'fresh' | 'sold-out' | 'preparing';

interface StatusBadgeProps {
  status: RiceStatus;
}

export default function StatusBadge({status}: StatusBadgeProps) {
  const statusConfig: Record<
    RiceStatus,
    {label: string; variant: 'default' | 'secondary' | 'outline'}
  > = {
    fresh: {label: '당일 도정', variant: 'default'},
    preparing: {label: '준비 중', variant: 'secondary'},
    'sold-out': {label: '품절', variant: 'outline'},
  };

  const {label, variant} = statusConfig[status];

  return <Badge variant={variant}>{label}</Badge>;
}
