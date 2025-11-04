'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductForm } from '@/components/admin/product-form'
import { useAuthCheck } from '@/hooks/use-auth-check'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter()
  const { isLoading: authLoading, isAuthenticated } = useAuthCheck()
  const [id, setId] = useState<string>('')
  const [paramsLoading, setParamsLoading] = useState(true)

  useEffect(() => {
    // Set the ID from params
    params.then((resolvedParams) => {
      setId(resolvedParams.id)
      setParamsLoading(false)
    })
  }, [params])

  const handleSuccess = () => {
    router.push('/admin')
  }

  const handleCancel = () => {
    router.push('/admin')
  }

  if (authLoading || paramsLoading) {
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground mt-2">
            Update product information
          </p>
        </div>

        <ProductForm
          productId={id}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}