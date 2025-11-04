'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import type { Store } from '@/lib/types'

interface StoreFormProps {
  storeId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function StoreForm({ storeId, onSuccess, onCancel }: StoreFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
  })

  useEffect(() => {
    if (storeId) {
      // Load existing store data for editing
      fetch(`/api/stores/${storeId}`)
        .then(res => res.json())
        .then(store => {
          setFormData({
            name: store.name || '',
            description: store.description || '',
            address: store.address || '',
            city: store.city || '',
          })
        })
        .catch(error => {
          console.error('Error loading store:', error)
          toast({
            title: 'Error',
            description: 'Failed to load store data',
            variant: 'destructive',
          })
        })
    }
  }, [storeId, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = storeId ? `/api/admin/stores/${storeId}` : '/api/admin/stores'
      const method = storeId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save store')
      }

      toast({
        title: 'Success',
        description: `Store ${storeId ? 'updated' : 'created'} successfully`,
      })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error saving store:', error)
      toast({
        title: 'Error',
        description: 'Failed to save store',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{storeId ? 'Edit Store' : 'Create Store'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter store name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter store description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter store address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (storeId ? 'Update Store' : 'Create Store')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => router.push('/admin'))}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}