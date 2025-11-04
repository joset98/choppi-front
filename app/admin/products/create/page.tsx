'use client'

import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { useAuthCheck } from '@/hooks/use-auth-check'

export default function CreateProductPage() {
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuthCheck()

  const handleSuccess = () => {
    router.push('/admin')
  }

  const handleCancel = () => {
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // The hook will handle redirection
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
          <p className="text-muted-foreground mt-2">
            Add a new product to the catalog
          </p>
        </div>

        <ProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  )
}