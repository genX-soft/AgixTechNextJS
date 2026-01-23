'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Lock, Loader2, Eye, ArrowLeft, RefreshCw, Users, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { Lead } from '@shared/schema'

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [storedPasscode, setStoredPasscode] = useState('')
  const [error, setError] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/leads', {
        headers: {
          'x-passcode': passcode,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
        setStoredPasscode(passcode)
        setIsAuthenticated(true)
      } else {
        setError('Invalid passcode')
      }
    } catch (err) {
      setError('Failed to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLeads = async () => {
    if (!storedPasscode) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/leads', {
        headers: {
          'x-passcode': storedPasscode,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      } else if (response.status === 401) {
        setIsAuthenticated(false)
        setStoredPasscode('')
        setError('Session expired. Please re-enter passcode.')
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteLead = async (leadId: string, leadName: string) => {
    if (!confirm(`Are you sure you want to delete the lead "${leadName}"? This action cannot be undone.`)) {
      return
    }
    
    setDeletingId(leadId)
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'x-passcode': storedPasscode,
        },
      })
      
      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== leadId))
      } else {
        alert('Failed to delete lead')
      }
    } catch (err) {
      console.error('Failed to delete lead:', err)
      alert('Failed to delete lead')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getFormTypeBadgeVariant = (formType: string | null) => {
    switch (formType) {
      case 'cta_consultation':
        return 'default'
      case 'contact_form':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const formatFormType = (formType: string | null) => {
    if (!formType) return 'Unknown'
    return formType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getScoreBadge = (score: number | null) => {
    if (score === null || score === undefined) return { label: 'N/A', variant: 'outline' as const, color: '' }
    if (score >= 70) return { label: 'Hot', variant: 'default' as const, color: 'bg-red-500' }
    if (score >= 50) return { label: 'Warm', variant: 'default' as const, color: 'bg-orange-500' }
    if (score >= 30) return { label: 'Qualified', variant: 'default' as const, color: 'bg-yellow-500' }
    return { label: 'Nurture', variant: 'secondary' as const, color: '' }
  }

  const getReadinessColor = (tag: string | null) => {
    switch (tag) {
      case 'Enterprise / Multi-System':
        return 'border-purple-500 text-purple-600 dark:text-purple-400'
      case 'Ready for Pilot':
        return 'border-green-500 text-green-600 dark:text-green-400'
      case 'Budget-Aware Evaluator':
        return 'border-blue-500 text-blue-600 dark:text-blue-400'
      default:
        return 'border-muted-foreground/30'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                Enter the passcode to view lead data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  data-testid="input-admin-passcode"
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-admin-unlock">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Unlock'
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Lead Management</h1>
                <p className="text-sm text-muted-foreground">{leads.length} leads captured</p>
              </div>
            </div>
            <Button onClick={fetchLeads} variant="outline" size="sm" disabled={isLoading} data-testid="button-refresh-leads">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && leads.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : leads.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Leads Yet</h3>
              <p className="text-muted-foreground">
                Leads will appear here when visitors submit forms on your website.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">All Leads</CardTitle>
              <CardDescription>Click on a lead to view full details including user journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Score</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>AI Readiness</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => {
                      const scoreBadge = getScoreBadge(lead.leadScore)
                      return (
                        <TableRow 
                          key={lead.id} 
                          data-testid={`row-lead-${lead.id}`}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => window.open(`/admin/leads/${lead.id}`, '_blank')}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                                (lead.leadScore ?? 0) >= 70 ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                                (lead.leadScore ?? 0) >= 50 ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400' :
                                (lead.leadScore ?? 0) >= 30 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {lead.leadScore ?? '-'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="font-medium truncate">{lead.name}</p>
                              <a 
                                href={`mailto:${lead.email}`} 
                                className="text-xs text-muted-foreground hover:text-primary truncate block"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {lead.email}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{lead.company || '-'}</p>
                              {lead.companySize && <p className="text-xs text-muted-foreground">{lead.companySize}</p>}
                            </div>
                          </TableCell>
                          <TableCell>
                            {lead.aiReadinessTag ? (
                              <Badge variant="outline" className={`text-xs ${getReadinessColor(lead.aiReadinessTag)}`}>
                                {lead.aiReadinessTag}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-sm">{lead.industry || '-'}</TableCell>
                          <TableCell>
                            {lead.urgency ? (
                              <span className="text-xs">{lead.urgency.split(' ')[0]}</span>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {formatDate(lead.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link 
                                href={`/admin/leads/${lead.id}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button variant="ghost" size="sm" data-testid={`button-view-lead-${lead.id}`}>
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteLead(lead.id, lead.name)
                                }}
                                disabled={deletingId === lead.id}
                                data-testid={`button-delete-lead-${lead.id}`}
                              >
                                {deletingId === lead.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
