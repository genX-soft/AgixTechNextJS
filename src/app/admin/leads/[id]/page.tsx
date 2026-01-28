'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Lock, Loader2, Mail, Building2, User, Clock, MapPin, ArrowLeft, Globe, Monitor } from 'lucide-react'
import Link from 'next/link'
import type { Lead } from '@shared/schema'

interface LeadMetadata {
  deviceType?: string;
  screenWidth?: number;
  ipAddress?: string;
  timezone?: string;
  language?: string;
  timeline?: string;
  landingPage?: string;
  referrer?: string;
  referrerDomain?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  userAgent?: string;
  [key: string]: unknown;
}

function hasMetadata(metadata: unknown): metadata is LeadMetadata {
  return metadata !== null && typeof metadata === 'object' && Object.keys(metadata).length > 0;
}

export default function LeadDetailPage() {
  const params = useParams()
  const leadId = params.id as string
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [storedPasscode, setStoredPasscode] = useState('')
  const [error, setError] = useState('')
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        headers: {
          'x-passcode': passcode,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setLead(data)
        setStoredPasscode(passcode)
        setIsAuthenticated(true)
      } else if (response.status === 401) {
        setError('Invalid passcode')
      } else if (response.status === 404) {
        setError('Lead not found')
      } else {
        setError('Something went wrong')
      }
    } catch (err) {
      setError('Failed to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
              <CardTitle>View Lead Details</CardTitle>
              <CardDescription>
                Enter the passcode to view this lead
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
                  data-testid="input-lead-detail-passcode"
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-lead-detail-unlock">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'View Lead'
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/admin/leads/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back to All Leads
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <p className="text-muted-foreground">Lead not found</p>
            <Link href="/admin/leads/">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Leads
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/leads/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Leads
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{lead.name}</h1>
              <p className="text-sm text-muted-foreground">Submitted {formatDate(lead.createdAt)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="font-medium text-lg">{lead.name}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="font-medium text-lg">
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                    {lead.email}
                  </a>
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  Company
                </div>
                <p className="font-medium text-lg">{lead.company || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  Role / Title
                </div>
                <p className="font-medium text-lg">{lead.role || 'Not provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Lead Intelligence
            </CardTitle>
            <CardDescription>AI-computed scoring and qualification data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className={`text-3xl font-bold mb-1 ${
                  (lead.leadScore ?? 0) >= 70 ? 'text-red-500' :
                  (lead.leadScore ?? 0) >= 50 ? 'text-orange-500' :
                  (lead.leadScore ?? 0) >= 30 ? 'text-yellow-500' :
                  'text-muted-foreground'
                }`}>
                  {lead.leadScore ?? 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Lead Score</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-lg font-semibold mb-1">
                  {lead.aiReadinessTag || 'Not assessed'}
                </div>
                <p className="text-xs text-muted-foreground">AI Readiness</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-lg font-semibold mb-1">
                  {lead.urgency?.split(' ')[0] || 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Urgency</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-lg font-semibold mb-1">
                  {lead.companySize?.split(' ')[0] || 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Company Size</p>
              </div>
            </div>

            {lead.industry && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Industry</p>
                <Badge variant="secondary">{lead.industry}</Badge>
              </div>
            )}

            {lead.challenges && Array.isArray(lead.challenges) && lead.challenges.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Challenges Identified</p>
                <div className="flex flex-wrap gap-2">
                  {lead.challenges.map((challenge, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{challenge}</Badge>
                  ))}
                </div>
              </div>
            )}

            {lead.behaviorData && typeof lead.behaviorData === 'object' && (
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Engagement Signals</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(lead.behaviorData as any).scrollDepth !== undefined && (
                    <div className="p-3 rounded-md bg-muted/30">
                      <p className="text-xl font-semibold">{(lead.behaviorData as any).scrollDepth}%</p>
                      <p className="text-xs text-muted-foreground">Scroll Depth</p>
                    </div>
                  )}
                  {(lead.behaviorData as any).timeOnPage !== undefined && (
                    <div className="p-3 rounded-md bg-muted/30">
                      <p className="text-xl font-semibold">{(lead.behaviorData as any).timeOnPage}s</p>
                      <p className="text-xs text-muted-foreground">Time on Page</p>
                    </div>
                  )}
                  {(lead.behaviorData as any).interactionCount !== undefined && (
                    <div className="p-3 rounded-md bg-muted/30">
                      <p className="text-xl font-semibold">{(lead.behaviorData as any).interactionCount}</p>
                      <p className="text-xs text-muted-foreground">Interactions</p>
                    </div>
                  )}
                  {(lead.behaviorData as any).exitIntent !== undefined && (
                    <div className="p-3 rounded-md bg-muted/30">
                      <p className="text-xl font-semibold">{(lead.behaviorData as any).exitIntent ? 'Yes' : 'No'}</p>
                      <p className="text-xs text-muted-foreground">Exit Intent</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(lead.metadata as any)?.scoreBreakdown && (
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Score Breakdown</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-md bg-muted/30">
                    <p className="text-lg font-semibold">{(lead.metadata as any).scoreBreakdown.companySize}</p>
                    <p className="text-xs text-muted-foreground">Company Size</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/30">
                    <p className="text-lg font-semibold">{(lead.metadata as any).scoreBreakdown.urgency}</p>
                    <p className="text-xs text-muted-foreground">Urgency</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/30">
                    <p className="text-lg font-semibold">{(lead.metadata as any).scoreBreakdown.engagement}</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/30">
                    <p className="text-lg font-semibold">{(lead.metadata as any).scoreBreakdown.intent}</p>
                    <p className="text-xs text-muted-foreground">Intent</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Form Type</p>
                <Badge variant={getFormTypeBadgeVariant(lead.formType)} className="text-sm">
                  {formatFormType(lead.formType)}
                </Badge>
              </div>
              {lead.pagePath && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Submitted From</p>
                  <Badge variant="outline" className="text-sm font-mono">{lead.pagePath}</Badge>
                </div>
              )}
              {lead.source && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Source</p>
                  <Badge variant="outline" className="text-sm">{lead.source}</Badge>
                </div>
              )}
            </div>

            {lead.message && (
              <div className="space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">Message</p>
                <div className="p-4 bg-muted/50 rounded-md">
                  <p className="whitespace-pre-wrap">{lead.message}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {lead.journey && Array.isArray(lead.journey) && lead.journey.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                User Journey
              </CardTitle>
              <CardDescription>{lead.journey.length} pages visited before submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lead.journey.map((entry: any, index: number) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-3 rounded-md bg-muted/30 border border-border/50"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {entry.path}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                      </div>
                      {entry.title && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {entry.title}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {hasMetadata(lead.metadata) && (() => {
          const meta = lead.metadata;
          return (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Visitor Information
                </CardTitle>
                <CardDescription>Technical details about the visitor and their session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {meta.deviceType && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Device Type</p>
                      <p className="font-medium capitalize">{String(meta.deviceType)}</p>
                    </div>
                  )}
                  {meta.screenWidth && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Screen Width</p>
                      <p className="font-medium">{String(meta.screenWidth)}px</p>
                    </div>
                  )}
                  {meta.ipAddress && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">IP Address</p>
                      <p className="font-medium font-mono text-sm">{String(meta.ipAddress)}</p>
                    </div>
                  )}
                  {meta.timezone && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Timezone</p>
                      <p className="font-medium">{String(meta.timezone)}</p>
                    </div>
                  )}
                  {meta.language && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Browser Language</p>
                      <p className="font-medium">{String(meta.language)}</p>
                    </div>
                  )}
                  {meta.timeline && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Requested Timeline</p>
                      <p className="font-medium">{String(meta.timeline)}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  {meta.landingPage && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Landing Page (First Visit)</p>
                      <p className="font-mono text-sm bg-muted/50 px-2 py-1 rounded">{String(meta.landingPage)}</p>
                    </div>
                  )}
                  {meta.referrer && meta.referrer !== 'direct' && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Came From (Referrer)</p>
                      <p className="font-medium text-sm break-all">{String(meta.referrerDomain || meta.referrer)}</p>
                    </div>
                  )}
                  {meta.referrer === 'direct' && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Came From</p>
                      <p className="font-medium">Direct Visit (typed URL or bookmark)</p>
                    </div>
                  )}
                </div>

                {(meta.utm_source || meta.utm_medium || meta.utm_campaign) && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Campaign Tracking (UTM)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {meta.utm_source && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Source</p>
                          <Badge variant="outline">{String(meta.utm_source)}</Badge>
                        </div>
                      )}
                      {meta.utm_medium && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Medium</p>
                          <Badge variant="outline">{String(meta.utm_medium)}</Badge>
                        </div>
                      )}
                      {meta.utm_campaign && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Campaign</p>
                          <Badge variant="outline">{String(meta.utm_campaign)}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {meta.userAgent && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Browser Details</p>
                    <p className="text-xs font-mono bg-muted/50 p-2 rounded break-all text-muted-foreground">
                      {String(meta.userAgent)}
                    </p>
                  </div>
                )}

                <details className="pt-4 border-t">
                  <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">View Raw Data</summary>
                  <pre className="text-xs bg-muted/50 p-3 rounded overflow-x-auto mt-2">
                    {JSON.stringify(meta, null, 2)}
                  </pre>
                </details>
              </CardContent>
            </Card>
          );
        })()}
      </main>
    </div>
  )
}
